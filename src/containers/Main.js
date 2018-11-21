import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appointmentsActions } from '../redux/context/appointments';
import { MainView } from '../components/views';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        }
    }

    componentWillMount = () => {
        this.handleGetAppointments();
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
        if(nextProps.appointments !== undefined){
            if(nextProps.appointments.data !== undefined){
                this.setState({appointments: nextProps.appointments.data.data})
            }

            if(nextProps.appointments.lastCreated !== undefined){
                if(nextProps.appointments.lastCreated.data.data !== undefined){
                    this.handleGetAppointments();
                }
            }

            if(nextProps.appointments.lastUpdated !== undefined){
                if(nextProps.appointments.lastUpdated.data.data !== undefined){
                    this.handleGetAppointments();
                }
            }

            if(nextProps.appointments.delete !== undefined){
                if(nextProps.appointments.delete.data.data !== undefined){
                    this.handleGetAppointments();
                }
            }
        }
    }

    render() {
        const { appointments } = this.state;
        return (
            <MainView 
                appointments={appointments} 
                onSaveAppointments={this.handleSaveAppointment}
                onUpdateAppointments={this.handleUpdateAppointment}
                onDeleteAppointments={this.handleDeleteAppointment} />
        )
    }

    handleGetAppointments = () => {
        const { dispatch } = this.props;
        dispatch(appointmentsActions.getAppointments())
    }

    handleSaveAppointment = (data) => {
        const { dispatch } = this.props;
        dispatch(appointmentsActions.createAppointments(data));
    }

    handleDeleteAppointment = (id) => {
        const { dispatch } = this.props;
        dispatch(appointmentsActions.deleteAppointment(id));
    }

    handleUpdateAppointment = (data) => {
        const teste = {
            id: data.id,
            title: data.title,
            date: new Date(data.date),
            start_time: data.start_time,
            end_time: data.end_time
        }
        const { dispatch } = this.props;
        dispatch(appointmentsActions.updateAppointments(data));
    }

}

const mapStateToProps = (state) => ({
    appointments: state.context.appointments
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);