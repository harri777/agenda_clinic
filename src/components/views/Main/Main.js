import React from "react";
import dateFns from "date-fns";
import _ from "lodash";
import { Calendar } from '../../blocks';
import { Loader, Toast } from '../../elements';

import './Main.css'


class MainView extends React.Component {
	state = {
		currentMonth: new Date(),
		selectedDate: new Date(),
		appointments: [],
		isLoading: false,
		openToast: false
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps !== undefined){
			if(nextProps.appointments.data !==  undefined){
				if(nextProps.appointments.data.data !== undefined){
					let order = _.orderBy(nextProps.appointments.data.data, 'start_time', 'asc');
					const _appointments = _.groupBy(order, function (i) {
						return dateFns.format(i.date, 'DD/MM/YYYY');
					})	
					this.setState({appointments: _appointments})
				}
			}
			if(nextProps.appointments.isLoading){
				this.setState({isLoading: true})
			} else {
				this.setState({isLoading: false})
			}

			if(nextProps.appointments.errors !== null){
				this.setState({
					openToast: true,
					msgToast: 'OPS! There was a problem!',
					appointments: []
				}) 
			} else {
				this.setState({
					openToast: false,
					msgToast: '',
					// appointments: []
				}) 
			}
		}
	}
	  
  	render() {
		const { appointments, isLoading, openToast, msgToast } = this.state;
    	return (
      		<div className="calendar">
				{isLoading &&
					<Loader />
				}
				<Calendar 
				  	appointments={appointments}
				  	saveAppointments={this.props.onSaveAppointments}
				  	updateAppointments={this.props.onUpdateAppointments}
				  	deleteAppointments={this.props.onDeleteAppointments} 
				/>
				<Toast open={openToast} msg={msgToast} time={5000} />
      		</div>	  
    	);
	}

}

export default MainView;