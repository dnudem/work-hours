// @flow

import { combineReducers } from 'redux'
import { INIT_NOTE_SELECTOR_TARGET,INIT_ACTION_SELECTOR_TARGET,INIT_PROJECT_SELECTOR_TARGET,INIT_PROJECTS, INIT_ACTIONS, INIT_CURRENT_PROJECT,INIT_CURRENT_ACTION, INIT_CURRENT_NOTE, INIT_NOTES, INIT_RECORDS, INIT_QUERY_RECORDS } from '../constants/actionTypes'

function projects(state = {}, action) {
    switch (action.type) {
    case INIT_PROJECTS: {
        return action.projects
    }
    default:
        return state
    }
}
function actions(state = {}, action) {
    switch (action.type) {
    case INIT_ACTIONS: {
        return action.actions
    }
    default:
        return state
    }
}
function currentProject(state = "", action) {
    switch (action.type) {
    case INIT_CURRENT_PROJECT: {
        return action.idx
    }
    default:
        return state
    }
}
function currentAction(state = "", action) {
    switch (action.type) {
    case INIT_CURRENT_ACTION: {
        return action.idx
    }
    default:
        return state
    }
}
function currentNote(state = "", action) {
    switch (action.type) {
    case INIT_CURRENT_NOTE: {
        return action.note
    }
    default:
        return state
    }
}
function notes(state = [], action) {
    switch (action.type) {
    case INIT_NOTES: {
        return action.notes
    }
    default:
        return state
    }
}
function records(state = [], action) {
    switch (action.type) {
    case INIT_RECORDS: {
        return action.records
    }
    default:
        return state
    }
}
function queryRecords(state = [], action) {
    switch (action.type) {
    case INIT_QUERY_RECORDS: {
        return action.records
    }
    default:
        return state
    }
}
function projectSelectorTarget(state = {element:null,callBack:null},action){
    switch (action.type) {
    case INIT_PROJECT_SELECTOR_TARGET: {
        return action.target
    }
    default:
        return state
    }
}
function actionSelectorTarget(state = {element:null,callBack:null},action){
    switch (action.type) {
    case INIT_ACTION_SELECTOR_TARGET: {
        return action.target
    }
    default:
        return state
    }
}
function noteSelectorTarget(state = {element:null,callBack:null,projectIdx:''},action){
    switch (action.type) {
    case INIT_NOTE_SELECTOR_TARGET: {
        return action.target
    }
    default:
        return state
    }
}
const workHoursData = combineReducers({
    projects,
    actions,
    currentProject,
    currentAction,
    currentNote,
    notes,
    records,
    queryRecords,
    projectSelectorTarget,
    actionSelectorTarget,
    noteSelectorTarget
})

export default workHoursData