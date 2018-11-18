import React from "react";
import _ from "lodash";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import './MessageBox.css'

class MessageBox extends React.Component {
	state = {
		open: false
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.open !== undefined){
			this.setState({open: nextProps.open})
		}
	} 


  	render() {
		const { open } = this.state;
		const actions = [
			<FlatButton
			  label="Cancel"
			  primary={true}
			  onClick={this.handleClose}
			/>,
			<FlatButton
			  label="Submit"
			  primary={true}
			  keyboardFocused={true}
			  onClick={this.handleClose}
			/>,
		];

    	return (
            <Dialog
				title="Appointment"
				actions={actions}
				modal={false}
				open={open}
				// contentStyle={customContentStyle}
				onRequestClose={this.handleClose}
			>
				<div Style="width: 100%; display: flex">
					<TextField hintText="Title" floatingLabelText="Title" />
					<DatePicker style={{marginLeft: 15}} floatingLabelText="Date" hintText="Portrait Dialog"/><br />
				</div>
				<div Style="width: 100%; display: flex">
					<TimePicker format="24hr" hintText="Start Hour" />
					<TimePicker style={{marginLeft: 15}} format="24hr" hintText="End Hour" />
				</div>
				<br />
			</Dialog>
    	);
	}

	handleClose = () => {
		this.setState({open: false});
	};

}

export default MessageBox;