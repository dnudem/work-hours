//@flow
import React from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { queryRecords } from '../actions/action'
class ReportPanel extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        beginDate: null,
	        endDate: null
	    }
	}
	changeBeginDate = (date) => {
		date.hour(0)
		date.minute(0)
		date.second(0)
		date.millisecond(0);
		this.setState({
		    beginDate: date
		},() => {
			if(this.state.endDate===""){
				this.changeEndDate(date.clone().add(4, 'day'))
			}else{
				this.queryRecord()
			}
		})
		
	}
	changeEndDate = (date) => {
		date.hour(0)
		date.minute(0)
		date.second(0)
		date.millisecond(0);
		this.setState({
		    endDate: date
		},() => {
			if(this.state.beginDate!=="" && this.state.endDate!==""){
				this.queryRecord()
			}
		})
	}
	queryRecord = () => {
		if(this.state.beginDate <= this.state.endDate){
			this.props.queryRecords(this.state.beginDate.valueOf(),this.state.endDate.valueOf())
		}else{
			this.setState({
			    beginDate: this.state.endDate,
			    endDate: this.state.beginDate
			},() => {
				this.props.queryRecords(this.state.beginDate.valueOf(),this.state.endDate.valueOf())
			})
		}
	}
	process = (data) => {
		let obj
		let resultObj = {}
		let fragment =""
		let projects = {}
		let actions = {}
		Object.keys(this.props.projects).forEach((key)=>{
			let val = this.props.projects[key]
			projects[val.idx] = val.name
		})
		Object.keys(this.props.actions).forEach((key)=>{
			let val = this.props.actions[key]
			actions[val.idx] = val.name
		})
		data.map(function(obj,idx) {
		    if (!resultObj[obj.projectIdx]) {
		        resultObj[obj.projectIdx] = {
		            total: 0
		        }
		    }
		    if (resultObj[obj.projectIdx][obj.actionIdx]) {
		        resultObj[obj.projectIdx][obj.actionIdx].hours += .5
		    } else {
		        resultObj[obj.projectIdx][obj.actionIdx]={hours:.5,notes:{}}
		    }
		    if(obj.currentNote!==''){
		    	resultObj[obj.projectIdx][obj.actionIdx].notes[obj.currentNote] = obj.currentNote
		    }
		    
		    resultObj[obj.projectIdx].total += .5
		})
		Object.keys(resultObj).map((projectIdx) => {		    
		    fragment += `<div>${projects[projectIdx]}：<b class="total">[${resultObj[projectIdx].total}hr]</b></div>`
		    fragment += `<ul class="report-hours-list">`
		    Object.keys(resultObj[projectIdx]).map((actionIdx,idx) => {
		    	let currentItem;
		        if (actionIdx !== 'total'){
		        	currentItem = resultObj[projectIdx][actionIdx]
					fragment += `<li class="item">${actions[actionIdx]} `
					if(Object.keys(currentItem.notes).length>0){
						fragment += `→ ${Object.keys(currentItem.notes).join('/')} `
					}
					fragment +=`<b class="hours">${currentItem.hours}hr</b></li>`

		        }
		    })
		    fragment += `</ul>`
		})
		return fragment;
	}
	reportPrint=()=>{
		window.print()
	}
    render() {
        return (
            <div className="report-panel">
		    	<DatePicker 
		    		className="text-ipt"
		            dateFormat="YYYY-MM-DD"
		            todayButton={"today"}
		            selected={this.state.beginDate} 
		            onChange={this.changeBeginDate} />
			    <DatePicker 
			    	className="text-ipt" 
				    dateFormat="YYYY-MM-DD"
		            todayButton={"today"}
		            minDate={this.state.beginDate}
			        selected={this.state.endDate} 
			        onChange={this.changeEndDate} />
		        <div className="report-result-blk" dangerouslySetInnerHTML={{__html: this.process(this.props.records)}} />
				<button onClick={this.reportPrint}>pdf</button>
			</div>
        )
    }
}
const mapStateToProps = store => ({
    projects: store.projects,
    actions: store.actions,
    records: store.queryRecords
})

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    queryRecords
}, dispatch))

// 連接Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ReportPanel)