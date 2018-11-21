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
		errorTitle: '',
		errorDate: '',
		errorStartTime: '',
		errorEndTime: ''
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
				open: false,
				errorTitle: '',
				errorDate: '',
				errorStartTime: '',
				errorEndTime: ''
			})
		} else {
			this.setState({
				title: '',
				date: '',
				startTime: '',
				endTime: '',
				update: false,
				open: false,
				errorTitle: '',
				errorDate: '',
				errorStartTime: '',
				errorEndTime: ''
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
			  	onClick={this.handleClose}
			/>,
			<FlatButton
			  	label="SAVE"
			  	primary={true}
			  	keyboardFocused={true}
			  	onClick={this.onSave}
			/>,
			this.state.update ? (
			<FlatButton
				style={{left: 0, position: 'absolute'}}
			  	label="DELETE"
			  	secondary={true}
			  	onClick={() => this.onDelete(this.state.id)}
			/>
			) : null
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
					<div className="timers-picker-container">
						<TextField 
							id="title"
							value={this.state.title}
							onChange={this.onChange}
							hintText="Title"
							floatingLabelText="Title"
							style={{marginLeft: 15}}
							errorText={this.state.errorTitle}
						/>
						<DatePicker 
							value={this.state.date}
							onChange={this.onChangeDate}
							// style={{marginLeft: 15}}
							floatingLabelText="Date"
							style={{marginLeft: 15}}
							hintText="Portrait Dialog"
							errorText={this.state.errorDate}
						/>
					</div>
					<div className="timers-picker-container">
						<TimePicker
							onChange={this.onChangeStartTime}
							value={this.state.startTime}
							format="24hr"
							style={{marginLeft: 15}}
							hintText="Start Hour"
							errorText={this.state.errorStartTime}
						/>
						<TimePicker 
							// Style="margin-left: 15px"
							onChange={this.onChangeEndTime}
							value={this.state.endTime}
							style={{marginLeft: 15}}
							format="24hr"
							hintText="End Hour" 
							errorText={this.state.errorEndTime}
						/>
					</div>
				</div>	
			</Dialog>
    	);
	}

	validFields = (title, date, startTime, endTime) => {
        let erros = false;
    
        if(title === ''){
            this.setState({ errorTitle: 'Is required' })
            erros = true;
        } else {
			this.setState({ 
				errorTitle: '',
			}) 
		}
        
        if(date === ''){
            this.setState({ errorDate: 'Is required' }) 
            erros = true;
        } else {
            this.setState({ errorDate: '' }) 
		}
		
		if(startTime === ''){
            this.setState({ errorStartTime: 'Is required' }) 
            erros = true;
        } else {
            this.setState({ errorStartTime: '' }) 
		}
		
		if(endTime === ''){
            this.setState({ errorEndTime: 'Is required' }) 
            erros = true;
        } else {
            this.setState({ errorEndTime: '' }) 
		}

		if(endTime < startTime){
			this.setState({ errorEndTime: 'End time must be greater than start time' }) 
            erros = true;
		} else {
			this.setState({ errorEndTime: '' }) 
		}

        if(!erros){
			this.setState({open: false})
			return true;
		}
           
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
		this.setState({endTime})
	}

	onDelete = (id: String) => {
		this.props.onDeleteAppointments(id);
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

		if(this.validFields(title, date, startTime, endTime)){
			if(update)
				this.props.onUpdateAppointments(data);
			else
				this.props.onSaveAppointments(data);

			this.handleClose();		
		}

		
	}

}

export default MessageBox;