//@flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeActionSelectorTarget } from '../actions/action'
class ProjectLabel extends React.Component {
	getCurrentActionName = () =>{
        let name = '讀取中'
        let currentAction = this.props.actions[this.props.idx];
        if(currentAction){
            name = currentAction.name
        }
        return name
    }
    onSelect=(idx)=>{
    	this.changeCurrentProject(idx)
    }
    showSelector=(e)=>{
		this.props.changeActionSelectorTarget(e.target,this.props.onSelect)
    }
    render(){
    	return (
			<div className="text-ipt action-label" onClick={this.showSelector}>{this.getCurrentActionName()}</div>
		)
    }	
}
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeActionSelectorTarget
}, dispatch))
const mapStateToProps = store => ({
    actions:store.actions
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectLabel)