import React from "react";
import dateFns from "date-fns";
import _ from "lodash";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import './Main.css'

const customContentStyle = {
	width: '50%',
	maxWidth: 'none',
  };

let appointments = [
	{
		id: 1,
		created_at: 1538587923916,
		updated_at: 1538587923916,
		title: 'background',
		date: '2018-08-30T22:56:01.306Z',
		start_time: '16:21',
		end_time: '16:51'
	},
	{
		id: 222,
		created_at: 1538587923916,
		updated_at: 1538587923916,
		title: 'background2222',
		date: '2018-08-30T22:56:01.306Z',
		start_time: '16:21',
		end_time: '16:51'
	},	
	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-08-29T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
  	},
  	{
	  	id: 20,
	  	created_at: 1538587923917,
	  	updated_at: 1538587923917,
	  	title: 'transitional',
	  	date: '2018-11-18T15:17:05.798Z',
	  	start_time: '08:59',
	  	end_time: '09:29'
  	},
  	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-11-18T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
  	},
  	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-11-18T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
  	},
  	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-11-18T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
  	},
  	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-11-18T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
  	},
  	{
		id: 20,
		created_at: 1538587923917,
		updated_at: 1538587923917,
		title: 'transitional',
		date: '2018-11-18T15:17:05.798Z',
		start_time: '08:59',
		end_time: '09:29'
	}
];

	class MainView extends React.Component {
  		state = {
    		currentMonth: new Date(),
    		selectedDate: new Date()
  		};

  	componentWillMount = () => {
		appointments = _.groupBy(appointments, function (i) {
			return dateFns.format(i.date, 'DD/MM/YYYY');
		});
  	}

  	renderHeader() {
		const dateFormat = "MMMM YYYY";
		const dateWeek = "DD/MM/YYYY"

    	return (
			<div className="header row flex-middle">
				<div className="col col-start">
					<div Style="padding: 10px">
						<FlatButton onClick={this.prevMonth} label="< Previous Week" primary={true} />
					</div>
				</div>
				<div className="col col-center">
					<span>{dateFns.format(this.state.currentMonth, dateFormat)}</span><br/>
					<span>{dateFns.format(dateFns.startOfWeek(this.state.currentMonth), dateWeek)}</span>
					<span> - </span>
					<span>{dateFns.format(dateFns.endOfWeek(this.state.currentMonth), dateWeek)}</span><br/>
				</div>
				<div className="col col-end">
					<div Style="padding: 10px">
						<FlatButton onClick={this.nextMonth} label="Next Week >" primary={true} />
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
		const { currentMonth, selectedDate } = this.state;
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
				const cloneDay = day;
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
									<div className="appointments_container"
									onClick={this.handleOpen}>
										<h5 Style="margin: 0px">Start: {item.start_time}</h5>
										<h5 Style="margin: 0px">End: {item.end_time}</h5>
										<p className="title">{item.title}</p>
									</div>		
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

  	// onDateClick = day => {
    // 	this.setState({
    // 	//   selectedDate: day
    // 	});
  	// };

  	nextMonth = () => {
    	this.setState({
      		currentMonth: dateFns.addWeeks(this.state.currentMonth, 1)
    	});
  	};

  	prevMonth = () => {
    	this.setState({
      		currentMonth: dateFns.subWeeks(this.state.currentMonth, 1)
    	});
  	};

  	render() {
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
      		<div className="calendar">
			  	<div Style="right: 10px;
    				position: absolute;
    				bottom: 25px;
    				z-index: 9999;">
					<FloatingActionButton onClick={this.handleOpen}>
						<ContentAdd />
					</FloatingActionButton>
			  	</div>
			  
        		{this.renderHeader()}
        		{this.renderDays()}
				{this.renderCells()}
			
				<Dialog
					title="Appointment"
					actions={actions}
					modal={false}
					open={this.state.open}
					contentStyle={customContentStyle}
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
      		</div>	  
    	);
	}
	  
	handleOpen = () => {
		this.setState({open: true});
	};
	
	handleClose = () => {
		this.setState({open: false});
	};
}

export default MainView;