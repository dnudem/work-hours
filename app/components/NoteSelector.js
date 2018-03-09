//@flow
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropSelector from './DropSelector'
import { changeNoteSelectorTarget} from '../actions/action'
const NoteSelector = (props) =>{
    const process = (dataObj) => {
        let _arr = []
        let _idx = 0
        const data = dataObj[props.target.projectIdx]
        if(data && data.length!==0){
            _arr.push(<button className="btn-note" key={"note-" + _idx++} onClick={onSelect} data-note={""}>
                            clear
                        </button>)
            data.forEach((item) => {
                _arr.push(<button className="btn-note" key={"note-" + _idx++} onClick={onSelect} data-note={item}>
                            {item}
                        </button>)
            })
        }
        
        return _arr
    }
    const onSelect =(e)=>{
        (props.target.callBack)(e.currentTarget.dataset['note'])
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
        if(!e.target.classList.contains('note-ipt')){
            props.changeNoteSelectorTarget(null)
        }
    }
    return (
        <DropSelector
            items={process(props.notes)} 
            targetElement={props.target.element}
            isShow={show(props.target)}/>
    )
}
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeNoteSelectorTarget
}, dispatch))

const mapStateToProps = store => ({
    notes: store.notes    
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteSelector)