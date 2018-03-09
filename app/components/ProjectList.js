//@flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addProject, deleteProject } from '../actions/action'
import ProjectItem from './ProjectItem'
import ProjectInput from './ProjectInput'

class ProjectList extends React.Component {
    deleteProject(idx) {
        let r = confirm('確定要刪除這個專案嗎?')
        if (r) this.props.deleteProject(idx)
    }
    addProject = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.props.addProject(e.target.value)
            e.target.value = '';
        }
    }
    process = (data) => {
        let _arr = [];
        let _item;
        Object.keys(data).forEach((key) => {
            _item = data[key]
            _arr.push(<ProjectItem key={_item.idx} name={_item.name} hours={_item.hours} deleteHandler={() => this.deleteProject(_item.idx)}/>)
        })
        return _arr
    }
    render() {
        return (
            <div className="project-list-wrapper">
                <ProjectInput keyUpHandler={this.addProject} placeholder = "輸入專案名稱↵"/>
                <ul className="project-list">{this.process(this.props.projects)}</ul>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    projects: store.projects
})

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    addProject,
    deleteProject
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)