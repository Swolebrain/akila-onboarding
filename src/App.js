import React, {Component} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import TextField from './common/TextField';
import RadioField from './common/RadioField';
import MultiSelectField from './common/MultiSelectField';
import MultiCheckboxField from './common/MultiCheckboxField';
import DateField from './common/DateField';
import {initialFormState} from './initialFormState.js'
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getFitbitPermissions, submitForm} from "./networking/networkingHelper";
import isEqual from 'lodash/isEqual';

const theme = createMuiTheme({
    palette: {
        primary: { main: "#ff6f00" },
        secondary: { main: "#1565c0" },
    },
});


class App extends Component {
    state = {
        form: initialFormState,
        formKeys: Object.keys(initialFormState),
        selectedInput: null,
        currentPage: 1
    };
    componentDidUpdate() {
        localStorage.setItem("storedState", JSON.stringify(this.state))
    };
    componentDidMount(){
        try{
            const storedState = localStorage.getItem("storedState");
            if (!storedState) return;
            const parsedState = JSON.parse(storedState);
            for (let key in parsedState.form){
                if (!this.state.form[key]) return console.log("key from localstorage disappeared");
                let formItemFromLS = parsedState.form[key];
                let formItemInState = this.state.form[key];
                if (Object.keys(formItemFromLS).length !== Object.keys(formItemInState).length) return console.log("Differing key lengths between hydrated state and real state");
                for (let formProp in formItemFromLS){
                    if (typeof formItemInState[formProp] === 'undefined') return console.log(`Property ${formProp} not in state form`);
                    if (formProp === 'value') continue;
                    if (formProp === 'values'){
                        if (!isEqual(
                            formItemFromLS[formProp].map(v=>({...v, selected: null})),
                            formItemInState[formProp].map(v=>({...v, selected: null}))
                        ))
                            return console.log(`Objects weren't equal: `, formItemFromLS[formProp], formItemInState[formProp]);
                    }
                    else {
                        if (!isEqual(formItemFromLS[formProp], formItemInState[formProp])) return console.log(`Objects weren't equal: `, formItemFromLS[formProp], formItemInState[formProp]);
                    }
                }
            }
            console.log("hydrating state...");
            this.setState({
                form: parsedState.form,
                currentPage: parsedState.currentPage
            });
            window.state = this.state;
        }
        catch (e) {
            console.log("Error loading saved state", e);
        }
    }
    clearForm = () => {
        localStorage.clear()
        this.setState({
            form: initialFormState,
            formKeys: Object.keys(initialFormState),
            selectedInput: null,
            currentPage: 1
        })
    }
    setFormField = (fieldName, valueSet) => this.setState(state => {
        const newState = {
            ...state,
            form: {
                ...state.form,
                [fieldName]: {
                    ...state.form[fieldName],
                    ...valueSet
                }
            }
        };
        console.log(newState);
        return newState;
    });
    setSelecetdInput = (formKey) => {
        setTimeout(() => this.setState(state => ({
            ...state,
            selectedInput: formKey
        })), 0)
    };
    unSelect = (e) => {
        e.stopPropagation();
        this.setState(state => ({
            ...state,
            selectedInput: null
        }))
    };
    buildComponent = (formKey, formItem) => {
        if (!formItem){
            localStorage.removeItem('storedState');
            window.location.reload()
        }
        const props = Object.assign(
            {
                key: formKey,
                fieldName: formKey,
                setFormField: this.setFormField,
                setSelectedInput: this.setSelecetdInput,
                currentlyFocused : this.state.selectedInput === formKey
            },
            formItem,
        );
        switch (formItem.type){
            case "radio":
                return <RadioField {...props} />;
            case "checkbox":
                return <MultiSelectField {...props} />;
            case "multicheckbox":
                return <MultiCheckboxField {...props} />;
            case "date":
                return <DateField {...props} />
            default:
                return <TextField {...props} type={formItem.type} />;
        }
    };

    submitForm = async () => {
        const submissionResult = await submitForm(this.state);
        if (submissionResult)
            this.nextPage();
    };
    nextPage = (direction=1) => this.setState(state => ({
        ...state,
        currentPage: state.currentPage+direction
    }));


    startFitbitAuthFlow = () => {
        let email = this.state.form.email.value;
        if (!email || email.length ===  0){
            email = prompt("Enter the email address you used to register for Akila");
        }
        getFitbitPermissions(email);
    }
    render() {
        if (this.state.currentPage !== 1) {
            return (
                <MuiThemeProvider theme={theme}>
                    <div style={{minHeight: '56vh', position: 'relative'}}>
                        <br/><br/>
                        <h2>Link your FitBit Account</h2>
                        <br/>
                        <p>Please click the button below to be redirected to the Fitbit website in order to allow access to your activity data.</p>
                        <p>You will need to sign in to the FitBit site using your fitbit account, which may be under a different email than the one you entered in the prior screen.</p>
                        <br/>
                        <Button
                            onClick={this.startFitbitAuthFlow}
                            variant="contained"
                            style={{color:'white', fontWeight:"bold", padding: "0.5rem 2rem", fontSize: "1rem"}}
                            color={"primary"} >
                            Fitbit Authorization
                        </Button>
                        <Button
                            color="primary"
                            className={`prev-btn theme.spacing.unit`}
                            style={{position: 'absolute'}}
                            onClick={this.nextPage.bind(this, -1)}
                        >
                            Previous
                        </Button>
                    </div>
                </MuiThemeProvider>
            )
        }
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App" onClick={this.unSelect}>
                    {
                        this.state.formKeys.map((formKey, idx) => {
                            // if (idx > 3) return;
                            const formItem = this.state.form[formKey];

                            return this.buildComponent(formKey, formItem);
                        })
                    }
                </div>
                <Button
                    color="primary"
                    variant={"text"}
                    className={`theme.spacing.unit`}
                    style={{padding: '0.5rem 2rem', marginRight: '2rem'}}
                    onClick={this.clearForm}
                >
                    Reset Form
                </Button>
                <Button
                    color="primary"
                    variant={"text"}
                    className={`theme.spacing.unit`}
                    style={{padding: '0.5rem 1rem', marginRight: '2rem'}}
                    onClick={this.nextPage}
                >
                    Fitbit Authorization
                </Button>
                <Button
                    onClick={this.submitForm}
                    variant="contained"
                    style={{color:'white', fontWeight:"bold", padding: "0.5rem 2rem", fontSize: "1rem"}}
                    color={"primary"} >
                    Submit
                </Button>
            </MuiThemeProvider>
        );
    }
}

export default App;
