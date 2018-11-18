import React from "react";
import _ from "lodash";

import './Appointments.css'

class Appointments extends React.Component {
  	render() {
    	return (
            <div className="appointments_container" onClick={this.props.click}>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">Start: {this.props.item.start_time}</h5>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">End: {this.props.item.end_time}</h5>
                <p style={{fontFamily: 'Muli'}} className="title">{this.props.item.title}</p>
            </div>	
    	);
	}

}

export default Appointments;