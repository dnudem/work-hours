//@flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProjectList from './ProjectList'
import ActionList from './ActionList'
import RecordList from './RecordList'
import ProjectSelector from './ProjectSelector'
import ActionSelector from './ActionSelector'
import NoteSelector from './NoteSelector'
import NoteArea from './NoteArea'
import Timer from './Timer'
import ReportPanel from './ReportPanel'
import ProjectLabel from './ProjectLabel'
import ActionLabel from './ActionLabel'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import { changeNoteSelectorTarget,changeActionSelectorTarget,changeProjectSelectorTarget,fecthProjectData, fecthActionData, fecthCurrentProject, fecthCurrentAction, fecthCurrentNote, fecthNotes, fetchRecords, changeCurrentProject,changeCurrentAction, changeCurrentNote } from '../actions/action'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordDate: Moment(),
            mode: "timer"
        }
    }
    componentDidMount() {
        const today = Moment(new Date())
        today.hour(0)
        today.minute(0)
        today.second(0)
        today.millisecond(0);
        this.props.fecthProjectData()
        this.props.fecthActionData()
        this.props.fecthCurrentProject()
        this.props.fecthCurrentAction()
        this.props.fecthCurrentNote()
        this.props.fecthNotes()
        this.props.fetchRecords(today.valueOf())
    }
    changeRecordDate = (date) => {
        date.hour(0)
        date.minute(0)
        date.second(0)
        date.millisecond(0);
        this.setState({
            recordDate: date
        })
        this.props.fetchRecords(date.valueOf())
    }
    changeComponentMode = (e) => {
        const mode = e.currentTarget.dataset.mode
        this.setState({
            mode: mode
        })
    }
    changeCurrentProject = (idx) =>{
        console.log(idx)
        this.props.changeCurrentProject(idx)
        this.props.changeCurrentNote("")
    }
    changeCurrentAction = (idx) =>{
        this.props.changeCurrentAction(idx)
    }
    changeCurrentNote = (arg) =>{
        let note
        if(typeof(arg)==='string'){
            note = arg;
        }else{
            note = arg.currentTarget.value
        }
        this.props.changeCurrentNote(note)
    }
    render() {
        return (
            <div className="app-wrapper">
                <div className="app-nav">
                    <button className={"btn-nav-item time" + (this.state.mode === "timer" ? " act" : "")} onClick={this.changeComponentMode} data-mode="timer">時間</button>
                    <button className={"btn-nav-item project" + (this.state.mode === "project" ? " act" : "")} onClick={this.changeComponentMode} data-mode="project">專案</button>
                    <button className={"btn-nav-item action" + (this.state.mode === "action" ? " act" : "")} onClick={this.changeComponentMode} data-mode="action">工項</button>
                    <button className={"btn-nav-item report" + (this.state.mode === "report" ? " act" : "")} onClick={this.changeComponentMode} data-mode="report">工項</button>
                </div>
                <div className="app-content">
                    <div className={"app-component" + (this.state.mode === "timer" ? " act" : "")}>
                        <Timer/>
                        <div className="current-setting-blk">
                            <ProjectLabel idx={this.props.currentProject} onSelect={this.changeCurrentProject}/>
                            <ActionLabel idx={this.props.currentAction} onSelect={this.changeCurrentAction}/>
                            <NoteArea projectIdx={this.props.currentProject} note={this.props.currentNote} onChange={this.changeCurrentNote} onSelect={this.changeCurrentNote}/>
                        </div>
                        <div className="record-list-wrapper">
                            <DatePicker className="text-ipt" dateFormat="YYYY-MM-DD" todayButton={"today"} selected={this.state.recordDate} onChange={this.changeRecordDate} />
                            <RecordList/>
                        </div>
                    </div>
                    <div className={"app-component" + (this.state.mode === "project" ? " act" : "")}>
                        <ProjectList/>
                    </div>
                    <div className={"app-component" + (this.state.mode === "action" ? " act" : "")}>
                        <ActionList/>
                    </div>
                    <div className={"app-component" + (this.state.mode === "report" ? " act" : "")}>
                        <ReportPanel/>
                    </div>
                </div>
                <ProjectSelector target={this.props.projectSelectorTarget}/>
                <ActionSelector target={this.props.actionSelectorTarget}/>
                <NoteSelector  target={this.props.noteSelectorTarget}/>\
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    fecthProjectData,
    fecthActionData,
    fecthCurrentProject,
    fecthCurrentAction,
    fecthCurrentNote,
    fecthNotes,
    fetchRecords,
    changeCurrentProject,
    changeCurrentAction,
    changeCurrentNote,
    changeProjectSelectorTarget,
    changeActionSelectorTarget,
    changeNoteSelectorTarget
}, dispatch))
const mapStateToProps = store => ({
    projects:store.projects,
    currentProject: store.currentProject,
    currentAction: store.currentAction,
    currentNote:store.currentNote,
    projectSelectorTarget:store.projectSelectorTarget,
    actionSelectorTarget:store.actionSelectorTarget,
    noteSelectorTarget:store.noteSelectorTarget
})
export default connect(mapStateToProps, mapDispatchToProps)(App)