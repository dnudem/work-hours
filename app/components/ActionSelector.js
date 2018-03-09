//@flow
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropSelector from './DropSelector'
import { changeActionSelectorTarget} from '../actions/action'
const ActionSelector = (props) =>{
    const process = (data) => {
        let _arr = []
        let _item
        Object.keys(data).forEach((key) => {
            _item = data[key]
            _arr.push(
                <button className="btn-action" key={_item.idx} onClick={onSelect} data-idx={_item.idx}>
                    {_item.name}
                </button>)
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
        if(!e.target.classList.contains('action-label')){
            props.changeActionSelectorTarget(null)
        }        
    }
    return (
        <DropSelector
            items={process(props.actions)} 
            targetElement={props.target.element}
            isShow={show(props.target)}/>
    )
}
const mapStateToProps = store => ({
    actions: store.actions
})
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeActionSelectorTarget
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(ActionSelector)