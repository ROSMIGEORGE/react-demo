import React, { Component } from 'react'
import Modal from './Modal';

class UserTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.real_name,
            tz: this.props.user.tz,
            activityDetails: this.props.user.activity_periods,
            show: false
        }
    }
    showModal = () => {
        this.setState({
            show: true
        });
    }
    hideModal = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const { name, tz, activityDetails, show } = this.state;
        return (
            <>
                <div className="user-tab" onClick={this.showModal}>
                    <div className="tab-w-8 user-data">
                        <div className="real-name">{name}</div>
                        <div className="time-zone">{tz}</div>
                    </div>
                    <div className="tab-w-2 activity-link">
                        <div><span className="material-icons">list</span></div>
                    </div>
                </div>
                <Modal show={show} activityDetails={activityDetails} hideModal={this.hideModal}></Modal>
            </>
        );
    }
}

export default UserTab;