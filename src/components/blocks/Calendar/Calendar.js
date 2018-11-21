import React from "react";
import dateFns from "date-fns";
import _ from "lodash";
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { Appointments, MessageBox } from '../';
import { Colors } from '../../../assets/pallet'

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
            this.setState({appointments: nextProps.appointments});
    }

  	render() {
    	return (
      		<div className="calendar">
                <div className="float-button">
					<FloatingActionButton onClick={this.onAddNewAppointment}>
                        <ContentAdd style={{marginTop: -16}}/>
                    </FloatingActionButton>
                </div>
        		{this.renderHeader()}
        		{this.renderDays()}
				{this.renderCells()}
				<MessageBox 
					open={this.state.open}
					onSaveAppointments={this.saveAppointments} 
				/>
      		</div>	  
    	);
	}

	 /* RENDER HEADER CALENDAR */
	renderHeader() {
		const dateFormat = "MMMM YYYY";
		const dateWeek = "DD/MM/YYYY";

    	return (
			<div className="header row flex-middle">
				<div className="col col-start">
					{/* PREVIOUS WEEK */}
					<div className="arrows-btn">
						<IconButton tooltip="Previous Week">
							<ArrowBack onClick={this.prevMonth} color={Colors.primary}/>
    					</IconButton>
					</div>
				</div>
				{/* RENDER DATE AND CURRENT WEEK */}
				<div className="col col-center">
					<span className="center-date">{dateFns.format(this.state.currentMonth, dateFormat)}</span><br/>
					<div className="div-dates">
						<span>{dateFns.format(dateFns.startOfWeek(this.state.currentMonth), dateWeek)}</span>
						<span> - </span>
						<span>{dateFns.format(dateFns.endOfWeek(this.state.currentMonth), dateWeek)}</span><br/>
					</div>
					
				</div>
				<div className="col col-end">
					{/* NEXT WEEK */}
					<div className="arrows-btn">
						<IconButton tooltip="Next Week">
							<ArrowForward onClick={this.nextMonth} color={Colors.primary}/>
    					</IconButton>
					</div>
				</div>
			</div>
    	);
  	}

	/* RENDER DAYS (columns) */
  	renderDays() {
    	const dateFormat = "dddd";
    	const days = [];

    	let startDate = dateFns.startOfWeek(this.state.currentMonth);

		/* ADD DAYS WEEK (MONDAY, ...) */
    	for (let i = 0; i < 7; i++) {
			let day = dateFns.format(dateFns.addDays(startDate, i), dateFormat);
      		days.push(
        		<div className="col col-center" key={i}>
					{/* SUBSTRING Days (Monday => Mon) */}	
          			{day.substring(0,3)}
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

		/* While end month */
    	while (day <= endDate) {
			/* ADD DAYS WEEK */
      		for (let i = 0; i < 7; i++) {
				formattedDate = dateFns.format(day, dateFormat);
				let _formattedDate = dateFns.format(day, 'DD/MM/YYYY');
        		days.push(
					/* Enable and disable days that are visible but are not part of the current month */
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

						{/* {ADD => LIST APPOINTMENTS} */}
						{appointments[_formattedDate] !== undefined && (
							appointments[_formattedDate].map((item, index) => {
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