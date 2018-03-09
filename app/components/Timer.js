import React from 'react'
import { addRecord, doNotify } from '../actions/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getTimeNow()
    }
    componentDidMount() {
        setInterval(this.tick, 1000)
    }
    tick = () => {
        this.now = new Date()
        this.setState(this.getTimeNow())
    }
    getTimeNow() {
        let now = new Date()
        let next = new Date()
        if (now.getMinutes() < 30) {
            next.setMinutes(30)
        } else {
            next.setMinutes(0)
            next.setHours(now.getHours() + 1)
        }
        next.setSeconds(0)
        if ((now.getMinutes() === 0 || now.getMinutes() === 30) && now.getSeconds() === 0 && this.state.isWork) {
            this.props.addRecord()
        }
        if ((now.getMinutes() === 59 || now.getMinutes() === 29) && now.getSeconds() === 0 && this.state.isWork) {
            this.props.doNotify()
        }
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            date: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
            countdown: this.getTimeRemaining(next),
            isWork: this.checkHour(now.getHours(), now.getSeconds())
        }
    }
    checkHour(hour, sec) {
        return (hour > 8 && hour < 18 && hour !== 12)
    }
    getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date())
        let seconds = Math.floor((t / 1000) % 60)
        let minutes = Math.floor((t / 1000 / 60) % 60)
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
        let days = Math.floor(t / (1000 * 60 * 60 * 24))
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    pad = (num) => num < 10 ? ('0' + num) : num
    render() {
        return (
            <div className={"timer-blk " + (this.state.isWork ? "is-work" : "is-rest")}>
                <div className="date-blk">
                    <span>{this.pad(this.state.year)} - </span>
                    <span>{this.pad(this.state.month)} - </span>
                    <span>{this.pad(this.state.date)}</span>
                </div>
                <div className="time-blk">
                    <span>{this.pad(this.state.hour)} : </span>
                    <span>{this.pad(this.state.minute)} : </span>
                    <span>{this.pad(this.state.second)}</span>                    
                </div>
                <div className="rest-hint">休息啦!!</div>
                <div className="countdown-blk">
                    <span>{this.pad(this.state.countdown.minutes)} : </span>
                    <span>{this.pad(this.state.countdown.seconds)}</span>
                </div>
                <button onClick={this.props.addRecord} >Add</button>
                <button onClick={this.props.doNotify} >notify</button>
                { /*<button onClick={this.props.doNotify} >Notify</button>*/ }
            </div>
        )
    }
}
// const mapStateToProps = store => ({
//     projects: store.projects,
//     actions: store.actions
// })

const mapDispatchToProps = (dispatch) => (
bindActionCreators({
    addRecord,
    doNotify
}, dispatch))
export default connect(null, mapDispatchToProps)(Timer)