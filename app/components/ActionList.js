//@flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addAction, deleteAction } from '../actions/action'
import ProjectItem from './ProjectItem'
import ProjectInput from './ProjectInput'

class ActionList extends React.Component {
    deleteAction(idx) {
        let r = confirm('確定要刪除這個工項嗎?')
        if (r) this.props.deleteAction(idx)
    }
    addAction = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.props.addAction(e.target.value)
            e.target.value = '';
        }
    }
    process = (data) => {
        let _arr = [];
        let _item;
        Object.keys(data).forEach((key) => {
            _item = data[key]
            _arr.push(<ProjectItem key={_item.idx} name={_item.name} deleteHandler={() => this.deleteAction(_item.idx)}/>)
        })
        return _arr
    }
    render() {
        return (
            <div className="project-list-wrapper">
                <ProjectInput keyUpHandler={this.addAction} placeholder="輸入工項名稱↵" />
                <ul className="project-list">{this.process(this.props.actions)}</ul>
            </div>
        )
    }
}
// 準備綁定用的mapStateToProps方法，
// 將store中的actions屬性綁到這個元件的props.actions屬性上
const mapStateToProps = store => ({
    actions: store.actions
})

// 準備綁定用的DispatchToProps方法，
// 只需要onFecthLoadItems這個方法
const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    addAction,
    deleteAction
}, dispatch))

// 連接Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ActionList)