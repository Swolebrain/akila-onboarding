import React, {Component} from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Route } from 'react-router';
import { BrowserRouter} from 'react-router-dom';
import SignupForm from './SignupForm';
import FitbitAuth from './FitbitAuth';
import ThankYou from './ThankYou';
import { createHistory, useBasename } from 'history';

const theme = createMuiTheme({
    palette: {
        primary: { main: "#ff6f00" },
        secondary: { main: "#1565c0" },
    },
});

const baseName = window.location.href.indexOf("localhost") === -1 ?
    "/onboarding" : "/";


class App extends Component {
    render() {

        return (
            <BrowserRouter basename={baseName}>
                <MuiThemeProvider theme={theme}>
                    <Route exact path={"/"} component={SignupForm} />
                    <Route exact path={"/fitbit"} component={FitbitAuth} />
                    <Route exact path={"/thankyou.html"} component={ThankYou} />
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
