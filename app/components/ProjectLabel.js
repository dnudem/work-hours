//@flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeProjectSelectorTarget } from '../actions/action'
class ProjectLabel extends React.Component {
	getCurrentProjectName = () =>{
        let name = '讀取中'
        let currentProject = this.props.projects[this.props.idx];
        if(currentProject){
            name = currentProject.name
        }
        return name
    }
    onSelect=(idx)=>{
    	this.changeCurrentProject(idx)
    }
    showSelector=(e)=>{
		this.props.changeProjectSelectorTarget(e.target,this.props.onSelect)
    }
    render(){
    	return (
			<div className="text-ipt project-label" onClick={this.showSelector}>{this.getCurrentProjectName()}</div>
		)
    }	
}
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeProjectSelectorTarget
}, dispatch))
const mapStateToProps = store => ({
    projects:store.projects
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectLabel)