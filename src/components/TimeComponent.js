import React from 'react';

function TimeComponent(props) {
    return (
        <div className="time-wrapper">
            <div className="time-btn-wrapper">
            <div className="time-btn">{props.start}</div>
            <div className="time-btn">{props.end}</div>
            </div>
            <div className="to">
                <div className="to-btn"><span className="material-icons">arrow_right_alt</span></div>
            </div>
        </div>
    );
}

export default TimeComponent;