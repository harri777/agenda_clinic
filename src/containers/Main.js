import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainActions } from '../redux/context/main';
import { MainView } from '../components/views';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.testRedux();
    }

    render() {
        return (
            <MainView />
        )
    }

    testRedux = (data) => {
        const { dispatch } = this.props;
        dispatch(mainActions.testRedux({foo: 'bar'}))
    }

}

const mapStateToProps = (state) => ({
    main: state.context.main,
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);