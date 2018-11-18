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
        const { dispatch } = this.props;
        dispatch(appointmentsActions.getAppointments())
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.appointments !== undefined){
            if(nextProps.appointments.data !== undefined){
                this.setState({appointments: nextProps.appointments.data.data})
            }
        }
    }

    render() {
        const { appointments } = this.state;
        return (
            <MainView appointments={appointments} />
        )
    }

}

const mapStateToProps = (state) => ({
    appointments: state.context.appointments,
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);