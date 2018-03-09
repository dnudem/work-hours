//@flow
import React from 'react'
import RecordItem from './RecordItem'
import { connect } from 'react-redux'

class RecordList extends React.Component {
    process = (data) => {
        let _arr = [];
        data.forEach((item) => {
            _arr.push(<RecordItem key={item.idx} recordIdx={item.idx} projectIdx={item.projectIdx} actionIdx={item.actionIdx} note={item.currentNote} time={item.time}  />)
        })
        return _arr
    }
    render() {
        return (
            <ul className="record-list">
                {this.process(this.props.records)}
            </ul>
        );
    }
}
const mapStateToProps = store => ({
    records: store.records
})

export default connect(mapStateToProps, null)(RecordList)