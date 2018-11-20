import React from "react";
import _ from "lodash";
import dateFns from "date-fns";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import './MessageBox.css'

class MessageBox extends React.Component {
	state = {
		open: false,
		title: '',
		date: '',
		startTime: '',
		endTime: '',
		id: null,
		update: false,
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.item !== undefined){
			this.setState({
				id: nextProps.item.id,
				title: nextProps.item.title,
				date: dateFns.parse(nextProps.item.date),
				startTime: nextProps.item.startTime,
				endTime: nextProps.item.endTime,
				update: true,
				open: false
			})
		} else {
			this.setState({
				title: '',
				date: '',
				startTime: '',
				endTime: '',
				update: false,
				open: false
			})
		}

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
			  label="SAVE"
			  primary={true}
			  keyboardFocused={true}
			  onClick={this.onSave}
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
				<div id="container" Style="overflow: hidden">
					<div Style="width: 100%; display: flex">
						<TextField id="title" value={this.state.title} onChange={this.onChange} hintText="Title" floatingLabelText="Title" />
						<DatePicker value={this.state.date} onChange={this.onChangeDate} style={{marginLeft: 15}} floatingLabelText="Date" hintText="Portrait Dialog"/><br />
					</div>
					<div Style="width: 100%; display: flex">
						<TimePicker onChange={this.onChangeStartTime} value={this.state.startTime} format="24hr" hintText="Start Hour" />
						<TimePicker onChange={this.onChangeEndTime} value={this.state.endTime} style={{marginLeft: 15}} format="24hr" hintText="End Hour" />
					</div>
				</div>	
				<br />
			</Dialog>
    	);
	}

	onChange = (event: Any) => {
        this.setState({[event.target.id]: event.target.value})  
	}

	onChangeDate = (e: Any, date: String) => {
        this.setState({date})  
	}
	
	onChangeStartTime = (e, startTime) => {
		this.setState({startTime}) 
	}

	onChangeEndTime = (e, endTime) => {
		const { startTime } = this.state;
		if(endTime < startTime){
			alert("Hora final não pode ser menor que a hora inicial.")
		} else {
			this.setState({endTime})
		}
	}

	handleClose = () => {
		this.setState({open: false});
	};

	onSave = () => {
		const {
			title,
			date,
			startTime,
			endTime,
			update,
			id,
		} = this.state;

		const data = { 
			id,
			title,
			date: dateFns.format(date, 'YYYY-MM-DD'),
			start_time: dateFns.format(startTime, 'HH:mm'),
			end_time: dateFns.format(endTime, 'HH:mm'),
			update
		}

		if(update)
			this.props.onUpdateAppointments(data);
		else
			this.props.onSaveAppointments(data);

		this.handleClose();		
	}

}

export default MessageBox;