import React from "react";
import _ from "lodash";
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
            title: this.props.item.title
        }
    	return (
            <div className="appointments_container" onClick={() => this.onClick(data)}>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">Start: {this.props.item.start_time}</h5>
                <h5 style={{fontFamily: 'Muli'}} Style="margin: 0px">End: {this.props.item.end_time}</h5>
                <p style={{fontFamily: 'Muli'}} className="title">{this.props.item.title}</p>
                <MessageBox open={this.state.open} item={this.state.item}/>
            </div>	
        );
    }
    
    onClick = (item) => {
        this.setState({ open: true, item })
    }

}

export default Appointments;