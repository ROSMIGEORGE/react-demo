import React, { Component } from 'react'

const TODAY = new Date();

class DateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.dateSelected.getDate(),
            month: this.props.dateSelected.getMonth(),
            year: this.props.dateSelected.getFullYear(),
            dayList: [],
            showCalender: this.props.dateSelected
        }
    }

    // function sets list of dates to be displayed
    getDateList = (InputDate) => {
        let dayList = []
            ,tag
            ,className
            ,key = 0
            ,day
            ,currentDate = InputDate;
        
        const c_date = {
            day: InputDate.getDay(),
            dd: InputDate.getDate(),
            mm: InputDate.getMonth(),
            yy: InputDate.getFullYear()
        };
        const s_date = {
            dd: this.props.dateSelected.getDate(),
            mm: this.props.dateSelected.getMonth(),
            yy: this.props.dateSelected.getFullYear()
        };

        for (let i = 0; i < c_date.day; i++) {
            tag = <div key={key} className="disabled-btn"></div>
            dayList.push(tag);
            key++;
        }

        while (currentDate.getMonth() === c_date.mm) {
            day = currentDate.getDate();
            if (currentDate > TODAY) {
                tag = <div key={key} className="disabled-btn" day={day} >{day}</div>
            }
            else {
                if (s_date.dd === day && s_date.mm === c_date.mm && s_date.yy === c_date.yy) {
                    className = 'day-btn selected';
                }
                else {
                    className = 'day-btn';
                }
                tag = <div key={key} className={className} day={day} onClick={this.updateDate}>{day}</div>
            }
            dayList.push(tag);
            key++;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        currentDate.setDate(currentDate.getDate() - 1);
        this.setState({
            dayList: dayList
        });

    }

    // updates selected date in parent component
    updateDate = (e) => {
        let dd = e.target.getAttribute('day');
        let mm = this.state.showCalender.getMonth() + 1;
        let yy = this.state.showCalender.getFullYear();
        let mm_dd_yy = new Date(mm + ',' + dd + ',' + yy);
        this.props.onUpdate(mm_dd_yy);

    }

    getMonthString = () => {
        let monthIndex = this.state.showCalender.getMonth();
        let calStart = (monthIndex + 1) + ",1," + this.state.showCalender.getFullYear();
        let showCal = new Date(calStart);
        return showCal;
    }

    // Navigates calender towards left
    leftUpdate = () => {
        let nextMonth = new Date(this.state.showCalender);
        nextMonth.setMonth(nextMonth.getMonth() - 1);
        this.setState({
            showCalender: nextMonth,
            month: nextMonth.getMonth(),
            year: nextMonth.getFullYear()
        }, () => {
            let firstdate = this.getMonthString();
            this.getDateList(firstdate);
        })
    }

    //navigates towards right if it is not current month
    rightUpdate = () => {
        let today = new Date();
        let nextMonth = new Date(this.state.showCalender);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            this.setState({
                showCalender: nextMonth,
                month: nextMonth.getMonth(),
                year: nextMonth.getFullYear()
            }, () => {
                let firstdate = this.getMonthString();
                this.getDateList(firstdate);
            })
    }

    //updates component onload and onstate change
    updateComponent = () => {
        let firstdate = this.getMonthString();
        this.setState({
            showCalender: firstdate
        }, () => {
            this.getDateList(firstdate);
        });
    }

    componentDidMount() {
        this.updateComponent()
    }

    componentDidUpdate(prevProps) {
        if (this.props.dateSelected !== prevProps.dateSelected)
            this.updateComponent()
    }

    render() {
        const { date, month, year, dayList, showCalender } = this.state;
        const monthList = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
        return (
            <div className="calender-wrapper">
                <div className="date-display"><span className="material-icons nav-arrow" onClick={this.leftUpdate}>navigate_before</span>
                    <span className="mm-yyyy">{monthList[month]}, {year}</span>
                    <span className="material-icons nav-arrow" onClick={this.rightUpdate}>navigate_next</span>
                </div>
                <div>{dayList}</div>
            </div>
        );
    }
}

export default DateComponent;