import React, { Component } from 'react';
// Material-UI
import Spinner from 'react-spinkit';
// Style
import './Loader.css';

export default class GameView extends Component {
    render() {
        return (
            <div id="loader" className="div_loader">
                <Spinner name="three-bounce" />
            </div>
        );
    }
}