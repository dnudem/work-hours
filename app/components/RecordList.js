//@flow
import React from 'react'
import RecordItem from './RecordItem'
import { connect } from 'react-redux'
import Moment from 'moment'

class RecordList extends React.Component {
    today = Moment()
    process = (data) => {
        let _arr = [];
        data.forEach((item) => {
            _arr.push(<RecordItem key={item.idx} recordIdx={item.idx} projectIdx={item.projectIdx} actionIdx={item.actionIdx} note={item.currentNote} time={item.time}  />)
        })
        return _arr
    }
    checkMissRecore = (records) =>{
        let _obj={
            "09:30:00":false,
            "10:00:00":false,
            "10:30:00":false,
            "11:00:00":false,
            "11:30:00":false,
            "12:00:00":false,
            "13:30:00":false,
            "14:00:00":false,
            "14:30:00":false,
            "15:00:00":false,
            "15:30:00":false,
            "16:00:00":false,
            "16:30:00":false,
            "17:00:00":false,
            "17:30:00":false,
            "18:00:00":false
        }
        let _fragment=[]
        if(records.length<16){
            records.forEach((item) => {
                _obj[Moment(item.time).format("HH:mm:ss")]=true
            })
            Object.keys(_obj).forEach(function (key) {
              if(!_obj[key]){
                _fragment.push(key)
              }
            });
            return <div className="miss-hint">Miss:{_fragment.join('、')}</div>
        }
        
    }
    checkPastOrNot = (date) => {
        if(date.day()%6==0){
            return false
        }
        return this.props.date.isBefore(Moment(),'day')
    }
    render() {
        return (
            <div>
                {this.checkPastOrNot(this.props.date)?this.checkMissRecore(this.props.records):null}
                <ul className="record-list">
                    {this.process(this.props.records)}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = store => ({
    records: store.records
})

export default connect(mapStateToProps, null)(RecordList)