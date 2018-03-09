import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BtnDelete from './BtnDelete'
import Moment from 'moment'
import DropSelector from './DropSelector'
import ProjectSelector from './ProjectSelector'
import ActionSelector from './ActionSelector'
import NoteArea from './NoteArea'
import ProjectLabel from './ProjectLabel'
import ActionLabel from './ActionLabel'
import { changeRecordProject, changeRecordAction, changeRecordNote, removeRecord } from '../actions/action'
class RecordItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProjectShow:false,
            dropSelectorArrowDirection:"arrow-left-top",
            dropSelectorStyle:{transform:"translate(0)"},
            isActionShow:false,
            isNoteShow:false
        }
    }
    optionsProcess = (data) => {
        let _arr = []
        data.forEach((item) => {
            _arr.push(<option key={item.idx} value={item.idx}>{item.name}</option>)
        })
        return _arr
    }
    projectItemProcess = (data) => {
        let _arr = []
        data.forEach((item) => {
            if(!item.isClose){
                _arr.push(
                    <button className="btn-project" key={item.idx} data-idx={item.idx} onClick={this.changeCurrentProject}>
                        {item.abbr||item.name}
                        <span className="year">{item.year}</span>
                    </button>)
            }            
        })
        return _arr
    }
    actionItemProcess = (data) => {
        let _arr = [];
        data.forEach((item) => {
            _arr.push(<button className="btn-action" key={item.idx} data-idx={item.idx} onClick={this.changeCurrentAction}>
                        {item.name}
                    </button>)
        })
        return _arr
    }
    changeProject = (idx) => {
        this.props.changeRecordProject(this.props.recordIdx, idx)
    }
    changeAction = (idx) => {
        this.props.changeRecordAction(this.props.recordIdx, idx)
    }
    changeNote = (arg) =>{
        let note
        if(typeof(arg)==='string'){
            note = arg;
        }else{
            note = arg.currentTarget.value
        }
        this.props.changeRecordNote(this.props.recordIdx, note)
    }
    confirmDelete = () => {
        let r = confirm('確定要刪除這項工時嗎?')
        if (r) {
            this.props.removeRecord(this.props.recordIdx)
        }
    }
    render() {
        return (
            <li className="item">
                <ProjectLabel idx={this.props.projectIdx} onSelect={this.changeProject}/>
                <ActionLabel idx={this.props.actionIdx} onSelect={this.changeAction}/>                 
                <NoteArea projectIdx={this.props.projectIdx} note={this.props.note} onChange={this.changeNote} onSelect={this.changeNote}/>
                <div className="time-blk"> 
                    <span className="time">{Moment(this.props.time).format('HH:mm:ss')}</span>
                    <BtnDelete clickHandler={this.confirmDelete}/>
                </div>
            </li>
        )
    }
}
const mapStateToProps = store => ({
    projects: store.projects,
    actions: store.actions,
})

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeRecordProject,
    changeRecordAction,
    changeRecordNote,
    removeRecord
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(RecordItem)