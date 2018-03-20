//@flow
import React from 'react'
import DropSelector from './DropSelector'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchMissRecords,addRecord } from '../actions/action'
class RecordAddPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordDate:null,
            target: {
                element:null
            }
        }
    }
    componentDidMount() {
        if(this.state.recordDate!=null)
            this.props.fetchMissRecords(this.state.recordDate.valueOf())
    }
    show = (target) =>{
        if(this.state.target.element===null){
            return false
        }
        document.addEventListener('click',this.closeSelector)
        return true
    }
    closeSelector= (e) =>{
        if(document.querySelector('#record-add-panel').contains(e.target)){
            return false
        }
        if(e.target.classList.contains('react-datepicker__day') ){
            
            return false
        }
        document.removeEventListener('click',this.closeSelector)
        this.setState({
            target: {
                element:null
            }
        })        
    }
    showAddPanel = (e) =>{
        this.setState({
            target: {
                element:e.currentTarget
            }
        })
    }
    changeRecordDate = (date) => {
        if(date === null) return false
        date.hour(0)
        date.minute(0)
        date.second(0)
        date.millisecond(0);
        this.setState({
            recordDate: date
        })
        this.props.fetchMissRecords(date.valueOf())
    }
    processData = (records) =>{
        let _obj={
            "09:30":false,
            "10:00":false,
            "10:30":false,
            "11:00":false,
            "11:30":false,
            "12:00":false,
            "13:30":false,
            "14:00":false,
            "14:30":false,
            "15:00":false,
            "15:30":false,
            "16:00":false,
            "16:30":false,
            "17:00":false,
            "17:30":false,
            "18:00":false
        }
        let _fragment=[]
        records.forEach((item) => {
            _obj[Moment(item.time).format("HH:mm")]=true
        })

        Object.keys(_obj).forEach((key) => {
          if(!_obj[key]){
            _fragment.push(<button className="btn-action" key={key} onClick={()=>this.addMissRecord(...key.split(':'))} >{key}</button>)
          }
        });
        return _fragment
    }
    addMissRecord = (hour,min) =>{
        let _time = this.props.currentQueryDate.clone()
        _time.hour(hour)
        _time.minute(min)
        _time.second(0)
        this.props.addRecord(_time.valueOf())
    }
    render(){
        return (
            <div>
                <button onClick={this.showAddPanel}>add</button>
                <div id="record-add-panel">
                    <DropSelector
                    items={
                        <div className="record-add-panel" >
                            <div className="miss-record-time-list">
                                {this.processData(this.props.records)}
                            </div>
                        </div>
                    } 
                    targetElement={this.state.target.element}
                    isShow={this.show(this.state.target)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    missRecords: store.missRecords,
    records: store.records,
    currentQueryDate: store.currentQueryDate
})

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    fetchMissRecords,
    addRecord
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(RecordAddPanel)