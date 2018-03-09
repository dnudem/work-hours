//@flow
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropSelector from './DropSelector'
import { changeProjectSelectorTarget} from '../actions/action'

const ProjectSelector = (props) =>{
    const process = (data) => {
        let _arr = []
        let _item
        Object.keys(data).forEach((key) => {
            _item = data[key]
            if(!_item.isClose){
                _arr.push(
                    <button className="btn-project" key={_item.idx} onClick={onSelect} data-idx={_item.idx}>
                        {_item.abbr||_item.name}
                        <span className="year">{_item.year}</span>
                    </button>)
            }            
        })
        return _arr
    }
    const onSelect =(e)=>{
        (props.target.callBack)(e.currentTarget.dataset['idx'])
    }
    const show = (target) =>{
        if(target.element===null){
            return false
        }
        document.addEventListener('click',closeSelector)
        return true
    }
    
    const closeSelector= (e) =>{
        document.removeEventListener('click',closeSelector)
        if(!e.target.classList.contains('project-label')){
            props.changeProjectSelectorTarget(null)
        }
    }
    return (
        <DropSelector
            items={process(props.projects)} 
            targetElement={props.target.element}
            isShow={show(props.target)}/>
    )
}
const mapStateToProps = store => ({
    projects: store.projects
})
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeProjectSelectorTarget
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector)