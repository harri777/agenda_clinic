import React from "react";
import dateFns, { getHours } from "date-fns";
import _ from "lodash";
import { Calendar } from '../../blocks'

import './Main.css'

const customContentStyle = {
	width: '50%',
	maxWidth: 'none',
  };

let appointmentsMOCK = [
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
		selectedDate: new Date(),
		appointments: []
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps !== undefined){
			let order = _.orderBy(nextProps.appointments, 'start_time', 'asc');
			const _appointments = _.groupBy(order, function (i) {
				return dateFns.format(i.date, 'DD/MM/YYYY');
			})	
			this.setState({appointments: _appointments})
		}
	}
	  
  	render() {
		const { appointments } = this.state;
    	return (
      		<div className="calendar">
				<Calendar 
				  appointments={appointments}
				  saveAppointments={this.props.onSaveAppointments}
				  updateAppointments={this.props.onUpdateAppointments}/>
      		</div>	  
    	);
	}

}

export default MainView;