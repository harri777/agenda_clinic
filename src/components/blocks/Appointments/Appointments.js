import React from "react";
import _ from "lodash";
import dateFns from "date-fns";
import { MessageBox } from '../'

import './Appointments.css'

class Appointments extends React.Component {
    state = {
        open: false,
        item: {}
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.edit === false){
            this.setState({open: false})
        }
    }

  	render() {    
        const data = {
            id: this.props.item.id,
            title: this.props.item.title,
            date: this.props.item.date,
            startTime: this.renderTimer(this.props.item.start_time),
            endTime: this.renderTimer(this.props.item.end_time)
        }

    	return (
            <div className="appointments_container" onClick={() => this.onClick(data)}>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">Start: {this.props.item.start_time}</h5>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">End: {this.props.item.end_time}</h5>
                <p style={{fontFamily: 'Muli'}} className="title">{this.props.item.title}</p>
                <MessageBox 
                    open={this.state.open}
                    item={this.state.item}
                    onUpdateAppointments={this.updateAppointments}
                    onDeleteAppointments={this.deleteAppointments}
                />
            </div>	
        );
    }

    renderTimer = (timer: String) => {
        let concatTimer = new Date().toDateString() + ' ' + timer;
        concatTimer = new Date(concatTimer)
        return concatTimer;

    }
    
    onClick = (item: Object) => {
        this.setState({ open: true, item })
    }

    updateAppointments = (data: Object) => {
        this.props.onUpdateAppointments(data)
    }

    deleteAppointments = (id: String) => {
        this.props.onDeleteAppointments(id)
    }

}

export default Appointments;