import React, { Component } from 'react'
import TimeComponent from './TimeComponent';
import DateComponent from './DateComponent';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelected: new Date(),
            activityDetails: this.props.activityDetails,
            timeList: [],
            isAvailable: false
        }
    }

    getTimeList = ()=> {
        let itemDate, tag, start, end;
        let dateSelected = this.state.dateSelected;
        let timeList = [];
        this.setState({
            isAvailable: false,
            timeList: []
        });
        this.state.activityDetails.map((item, key) => {
            itemDate = new Date(item.start_time.slice(0, -2));
            if (itemDate.getDate() === dateSelected.getDate() && itemDate.getMonth() === dateSelected.getMonth() && itemDate.getFullYear() == dateSelected.getFullYear()) {
                start = item.start_time.slice(-6, -2) + ' ' + item.start_time.slice(-2);
                end = item.end_time.slice(-6, -2) + ' ' + item.end_time.slice(-2);
                tag = <TimeComponent key={key} start={start} end={end}></TimeComponent>
                timeList.push(tag);
            }
        });
        if (timeList.length) {
            this.setState({
                isAvailable: true,
                timeList: timeList
            });
        }
    }

    updateDateSelected = (date) => {
        this.setState({
            dateSelected: date
        },()=>{
            this.getTimeList();
        });
    }
    componentDidMount() {
        console.log(this.state.dateSelected);
        this.getTimeList();
    }
        
    render() {
        if (this.props.show) {
            return (
                <div className="modal">
                    <div className="inner-modal">
                        <div className="modal-close" onClick={this.props.hideModal}><span className="material-icons">close</span></div>
                        <div className="date-time-wrapper">
                            <div className="time-section">
                                {this.state.timeList.length? <div>ACTIVITY LIST</div>:<div key={1}>NO ACTIVITY FOUND</div>}
                                <div>
                                {this.state.timeList}
                                </div>
                                </div>
                            <div className="date-section">
                                <DateComponent dateSelected={this.state.dateSelected} onUpdate={this.updateDateSelected}></DateComponent>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default Modal;