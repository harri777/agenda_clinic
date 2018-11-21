import React from "react";
import dateFns from "date-fns";
import _ from "lodash";
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Appointments, MessageBox } from '../';

import './Calendar.css'

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
		appointments: [],
		open: false,
		edit: false
    };
      
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.appointments !== undefined)
            this.setState({appointments: nextProps.appointments})
    }

  	render() {
    	return (
      		<div className="calendar">
                <div Style="right: -15px; position: absolute; bottom: 25px; z-index: 9999;">
					<FloatingActionButton onClick={this.onAddNewAppointment}>
                        <ContentAdd style={{marginTop: -16}}/>
                    </FloatingActionButton>
                </div>
        		{this.renderHeader()}
        		{this.renderDays()}
				{this.renderCells()}
				<MessageBox 
					open={this.state.open}
					onSaveAppointments={this.saveAppointments} />
      		</div>	  
    	);
	}

	renderHeader() {
		const dateFormat = "MMMM YYYY";
		const dateWeek = "DD/MM/YYYY"

    	return (
			<div className="header row flex-middle">
				<div className="col col-start">
					<div Style="padding: 10px">
						<FlatButton onClick={this.prevMonth} style={{fontFamily: 'Muli'}} label="< Previous Week" primary={true} />
					</div>
				</div>
				<div className="col col-center">
					<span style={{fontFamily: 'Muli'}}>{dateFns.format(this.state.currentMonth, dateFormat)}</span><br/>
					<span style={{fontFamily: 'Muli'}}>{dateFns.format(dateFns.startOfWeek(this.state.currentMonth), dateWeek)}</span>
					<span> - </span>
					<span style={{fontFamily: 'Muli'}}>{dateFns.format(dateFns.endOfWeek(this.state.currentMonth), dateWeek)}</span><br/>
				</div>
				<div className="col col-end">
					<div Style="padding: 10px">
						<FlatButton style={{fontFamily: 'Muli'}} onClick={this.nextMonth} label="Next Week >" primary={true} />
					</div>
				</div>
			</div>
    	);
  	}

  	renderDays() {
    	const dateFormat = "dddd";
    	const days = [];

    	let startDate = dateFns.startOfWeek(this.state.currentMonth);

    	for (let i = 0; i < 7; i++) {
      		days.push(
        		<div className="col col-center" key={i}>
          			{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        		</div>
      		);
    	}
    	return <div className="days row">{days}</div>;
  	}

  	renderCells() {
		const { currentMonth, selectedDate, appointments } = this.state;
		const monthStart = dateFns.startOfWeek(currentMonth);
		const monthEnd = dateFns.endOfWeek(monthStart);
		const startDate = dateFns.startOfWeek(monthStart);
		const endDate = dateFns.endOfWeek(monthEnd);

		const dateFormat = "D";
		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = "";

    	while (day <= endDate) {
      		for (let i = 0; i < 7; i++) {
				formattedDate = dateFns.format(day, dateFormat);
				let formattedDate2 = dateFns.format(day, 'DD/MM/YYYY');
        		days.push(
					<div
						className={`col cell ${
						!dateFns.isSameMonth(day, monthStart)
							? "disabled"
							: dateFns.isSameDay(day, selectedDate) ? "selected" : ""
						}`}
						key={day}
					>
						<span className="number">{formattedDate}</span>
						<span className="bg">{formattedDate}</span>

						{/* {LÓGICA DE ITEMS} */}
						{appointments[formattedDate2] !== undefined && (
							appointments[formattedDate2].map((item, index) => {
								return (
									<Appointments 
										key={index} 
										item={item} 
										edit={this.state.edit} 
										onUpdateAppointments={this.updateAppointments}
										onDeleteAppointments={this.deleteAppointments}
									/>	
								)}
							))
						}
					</div>
        		);
       	 		day = dateFns.addDays(day, 1);
      		}
			rows.push(
				<div className="row" key={day}>
					{days}
				</div>
			);
      		days = [];
    	}
    	return <div className="body">{rows}</div>;
    }
      

  	nextMonth = () => {
    	this.setState({
			currentMonth: dateFns.addWeeks(this.state.currentMonth, 1),
			open: false
    	});
	};

	prevMonth = () => {
    	this.setState({
			currentMonth: dateFns.subWeeks(this.state.currentMonth, 1),
			open: false
			  
    	});
  	};
	  


	updateAppointments = (data) => {
		this.props.updateAppointments(data);
	}

	deleteAppointments = (id) => {
		this.props.deleteAppointments(id);
	}

	saveAppointments = (data) => {
		this.setState({open: false});
		this.props.saveAppointments(data);
	}

	onAddNewAppointment = () => {
		this.setState({
			open: true,
			edit: false	
		});
	}
}

export default Calendar;