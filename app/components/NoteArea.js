//@flow
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeNoteSelectorTarget } from '../actions/action'
class NoteArea extends React.Component {
    constructor(props) {
        super(props)
    }
    showSelector=(e)=>{
        this.props.changeNoteSelectorTarget(e.target,this.props.onSelect,this.props.projectIdx)
    }
    render() {
        return (
            <input className = "text-ipt note-ipt" placeholder="備註" value={this.props.note} onChange={(e)=>this.props.onChange(e)} onClick={this.showSelector}/>
        );
    }
}
const mapStateToProps = store => ({
    notes: store.notes    
})
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    changeNoteSelectorTarget
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(NoteArea)