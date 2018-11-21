// React
import React from 'react';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// Style
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Router
import {BrowserRouter as Router, Route, Switch, browserHistory} from 'react-router-dom';
// Views
import { Main } from './containers';
//Components
import configureStore from './redux/store';
import WebFont from 'webfontloader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fetchInitialState from './redux/initialState';
import { ConnectedRouter } from "react-router-redux";
import history from './history';


const initialState = fetchInitialState(window.__INITIAL_STATE__);
const store = configureStore(initialState, history);

WebFont.load({
  google: {
    families: ['Muli']
  }
});

const muiTheme = getMuiTheme({
    palette: {
      primary1Color: '#1a8fff',
    },
    appBar: {
      height: 50,
    },
});


ReactDOM.render(  
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                    </Switch>
                </MuiThemeProvider>
            </div>
        </ConnectedRouter>
    </Provider>, document.getElementById('root')
);

