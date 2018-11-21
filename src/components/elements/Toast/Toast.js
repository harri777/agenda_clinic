import Snackbar from 'material-ui/Snackbar';
import React, { Component } from 'react';
// Style
import './Toast.css';

  
export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps !== undefined){
            this.setState({open: nextProps.open});
        }
    }
    

    render () {
        return (
            <div id="toast">
                <Snackbar
                    open={this.state.open}
                    message={this.props.msg}
                    autoHideDuration={this.props.time}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
            
        )
    }

    handleClick = () => { this.setState({ open: true });};
    
    handleRequestClose = () => { this.setState({ open: false });};
}