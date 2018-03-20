// @flow

import { INIT_CURRENT_QUERY_DATE, INIT_NOTE_SELECTOR_TARGET,INIT_ACTION_SELECTOR_TARGET,INIT_PROJECT_SELECTOR_TARGET,INIT_PROJECTS, INIT_ACTIONS, INIT_CURRENT_PROJECT, INIT_CURRENT_ACTION, INIT_CURRENT_NOTE, INIT_NOTES, INIT_RECORDS, INIT_QUERY_RECORDS, INIT_MISS_RECORDS} from '../constants/actionTypes'
import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from '../constants/config'

const notifier = require('node-notifier')
const database = firebase
    .initializeApp(FIREBASE_CONFIG)
    .database();

//project
export const onInitProjectData = (projects: Object) => ({
    type: INIT_PROJECTS,
    projects
})
export const fecthProjectData = () => (function(dispatch) {
    let hourObj;
    database.ref('records').on('value', snapshot => {
        hourObj = {}
        snapshot.forEach((item) => {
            hourObj[item.val().projectIdx] = (hourObj[item.val().projectIdx] + .5) || .5
        })
        database.ref('projects').orderByChild("isDelete").equalTo(false).on('value', snapshot => {
            let _obj
            let _resultObj={}
            snapshot.forEach((item) => {
                _obj = item.val()
                _obj.idx = item.key
                _obj.hours = (hourObj[item.key] || 0)+(_obj.hoursFix || 0)
                _resultObj[_obj.idx] = _obj
            })
            dispatch(onInitProjectData(_resultObj))
        })
    })
})
export const addProject = (name: string) => (function(dispatch) {
    database.ref('projects').push({
        name: name,
        isDelete: false,
        type: ''
    });
})
export const deleteProject = (idx: string) => (function(dispatch) {
    database.ref('projects/' + idx).update({
        isDelete: true
    });
})

//action
export const onInitActionData = (actions: Object) => ({
    type: INIT_ACTIONS,
    actions
})
export const fecthActionData = () => (function(dispatch) {
    database.ref('actions').on('value', snapshot => {
        let _obj
        let _resultObj={}
        snapshot.forEach((item) => {
            _obj = item.val()
            _obj.idx = item.key
            if (!_obj.isDelete) {
                _resultObj[_obj.idx] = _obj
            }
        })
        dispatch(onInitActionData(_resultObj))
    })
})
export const addAction = (name: string) => (function(dispatch) {
    database.ref('actions').push({
        name: name
    });
})
export const deleteAction = (idx: string) => (function(dispatch) {
    database.ref('actions/' + idx).update({
        isDelete: true
    });
})

//current project
export const onInitCurrentProject = (idx: string) => ({
    type: INIT_CURRENT_PROJECT,
    idx
})
export const fecthCurrentProject = () => (function(dispatch) {
    database.ref('currentProjectIdx').on('value', snapshot => {
        dispatch(onInitCurrentProject(snapshot.val()))
    })
})
export const changeCurrentProject = (idx: string) => (function(dispatch) {
    database.ref('currentProjectIdx').set(idx)
})

//current action
export const onInitCurrentAction = (idx: string) => ({
    type: INIT_CURRENT_ACTION,
    idx
})
export const fecthCurrentAction = () => (function(dispatch) {
    database.ref('currentActionIdx').on('value', snapshot => {
        dispatch(onInitCurrentAction(snapshot.val()))
    })
})
export const changeCurrentAction = (idx: string) => (function(dispatch) {
    database.ref('currentActionIdx').set(idx)
})

//current note
export const onInitCurrentNote = (note: string) => ({
    type: INIT_CURRENT_NOTE,
    note
})
export const fecthCurrentNote = () => (function(dispatch) {
    database.ref('currentNote').on('value', snapshot => {
        dispatch(onInitCurrentNote(snapshot.val()))
    })
})
export const changeCurrentNote = (note: string) => (function(dispatch) {
    database.ref('currentNote').set(note)
})

export const onInitNotes = (notes: Object) => ({
    type: INIT_NOTES,
    notes
})
export const fecthNotes = () => (function(dispatch) {
    database.ref('records').on('value', snapshot => {
        let resultObj = {}
        let valObj
        snapshot.forEach((item) => {
            valObj = item.val()
            if(!resultObj[valObj.projectIdx]){
                resultObj[valObj.projectIdx]={};
            }
            
            if (valObj.currentNote) {
                resultObj[valObj.projectIdx][valObj.currentNote] = valObj.currentNote
            }
        })
        Object.keys(resultObj).forEach((projectIdx) => {
            resultObj[projectIdx] = Object.keys(resultObj[projectIdx])
        })
        dispatch(onInitNotes(resultObj))
    })
})
//record
export const onInitRecords = (records: Array < Object >) => ({
    type: INIT_RECORDS,
    records
})
export const fetchRecords = (timeStamp) => (function(dispatch) {
    database.ref('records').orderByChild("time").startAt(timeStamp).endAt(timeStamp + 86400000).on('value', snapshot => {
        let arr = []
        let obj
        snapshot.forEach((item) => {
            obj = {}
            obj = item.val()
            obj.idx = item.key
            arr.push(obj)
        })
        dispatch(onInitRecords(arr.reverse()))
    })
})
export const changeRecordProject = (recordIdx: string, projectIdx: string) => (function(dispatch) {
    database.ref('records/' + recordIdx).update({
        projectIdx: projectIdx
    });
})
export const addRecord = (timeStamp) => (function(dispatch) {
    let promises = [];
    promises.push(database.ref('currentProjectIdx').once('value'))
    promises.push(database.ref('currentActionIdx').once('value'))
    promises.push(database.ref('currentNote').once('value'))
    Promise.all(promises).then((value) => {
        database.ref('records').push({
            projectIdx: value[0].val(),
            actionIdx: value[1].val(),
            currentNote: value[2].val(),
            time: timeStamp?timeStamp:new Date().getTime()
        })
    })
})
export const removeRecord = (recordIdx: string) => (function(dispatch) {
    database.ref('records/' + recordIdx).remove()
})
export const changeRecordAction = (recordIdx: string, actionIdx: string) => (function(dispatch) {
    database.ref('records/' + recordIdx).update({
        actionIdx: actionIdx
    });
})
export const changeRecordNote = (recordIdx: string, note: string) => (function(dispatch) {
    database.ref('records/' + recordIdx).update({
        currentNote: note
    });
})

export const doNotify = () => (function(dispatch) {
    let promises = [];
    promises.push(database.ref('currentProjectIdx').once('value'))
    promises.push(database.ref('currentActionIdx').once('value'))
    promises.push(database.ref('projects').once('value'))
    promises.push(database.ref('actions').once('value'))
    Promise.all(promises).then((value) => {
        notifier.notify({
            title: "工時記錄",
            message: (" 專案：" + (value[2].val()[value[0].val()].name) + "\r工項：" + (value[3].val()[value[1].val()].name)),
            sound: true,
            wait: true,
            type: 'warn'
        })
    })
})

//record
export const onInitQueryRecords = (records: Array < Object >) => ({
    type: INIT_QUERY_RECORDS,
    records
})
export const queryRecords = (beginTimeStamp,endTimeStamp) => (function(dispatch) {
    database.ref('records').orderByChild("time").startAt(beginTimeStamp).endAt(endTimeStamp + 86400000).on('value', snapshot => {
        let arr = []
        let obj
        snapshot.forEach((item) => {
            obj = {}
            obj = item.val()
            obj.idx = item.key
            arr.push(obj)
        })
        dispatch(onInitQueryRecords(arr))
    })
})

//project selector
export const onInitProjectSelectorTarget = (element: ?Object,callBack: ?Function) => ({
    type: INIT_PROJECT_SELECTOR_TARGET,
    target:{element,callBack}
})

export const changeProjectSelectorTarget = (element: ?Object,callBack: ?Function) => (function(dispatch) {
    dispatch(onInitProjectSelectorTarget(element,callBack))
})

//action selector
export const onInitActionSelectorTarget = (element: ?Object,callBack: ?Function) => ({
    type: INIT_ACTION_SELECTOR_TARGET,
    target:{element,callBack}
})

export const changeActionSelectorTarget = (element: ?Object,callBack: ?Function) => (function(dispatch) {
    dispatch(onInitActionSelectorTarget(element,callBack))
})

//note selector
export const onInitNoteSelectorTarget = (element: ?Object,callBack: ?Function,projectIdx: ?string) => ({
    type: INIT_NOTE_SELECTOR_TARGET,
    target:{element,callBack,projectIdx}
})

export const changeNoteSelectorTarget = (element: ?Object,callBack: ?Function,projectIdx: ?string) => (function(dispatch) {
    dispatch(onInitNoteSelectorTarget(element,callBack,projectIdx))
})

//miss record
export const onInitMissRecords = (records: Array < Object >) => ({
    type: INIT_MISS_RECORDS,
    records
})
export const fetchMissRecords = (timeStamp) => (function(dispatch) {
    database.ref('records').orderByChild("time").startAt(timeStamp).endAt(timeStamp + 86400000).on('value', snapshot => {
        let arr = []
        let obj
        snapshot.forEach((item) => {
            obj = {}
            obj = item.val()
            obj.idx = item.key
            arr.push(obj)
        })
        dispatch(onInitMissRecords(arr.reverse()))
    })
})

//current query date
export const onInitCurrentQueryDate = (date: Object) => ({
    type: INIT_CURRENT_QUERY_DATE,
    date
})
export const changeCurrentQueryDate = (date: Object) => (function(dispatch) {
    dispatch(onInitCurrentQueryDate(date))
})