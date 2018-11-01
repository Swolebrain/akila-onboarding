import React, {Component} from 'react';
import TextField from './common/TextField';
import RadioField from './common/RadioField';
import MultiSelectField from './common/MultiSelectField';
import MultiCheckboxField from './common/MultiCheckboxField';
import DateField from './common/DateField';
import {initialFormState} from './initialFormState.js'
import './App.css';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import {Link} from 'react-router-dom';
import {submitForm} from "./networking/networkingHelper";


class SignupForm extends Component {
    state = {
        form: initialFormState,
        formKeys: Object.keys(initialFormState),
        selectedInput: null,
        currentPage: 1
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        //don't save a password locally x.x
        const stateToSave = {
            ...this.state,
            formKeys: {
                ...this.state.formKeys,
                password: {
                    label: "Choose app password",
                    value: "",
                    type: "password"
                },
                passwordConf: {
                    label: "Confirm your password",
                    value: "",
                    type: "password"
                },
            }
        }
        localStorage.setItem("storedState", JSON.stringify(stateToSave));
    };
    componentDidMount(){
        window.addEventListener('keydown', e=>{
            if (e.keyCode === 9) e.preventDefault();
        });

        this.hydrateState();
    }
    hydrateState = () => {
        try {
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
        return newState;
    });
    setSelectedInput = (formKey) => {
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
                setSelectedInput: this.setSelectedInput,
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
            this.props.history.push('/fitbit');
    };

    render() {
        console.log(this.props.history);
        return (
            <React.Fragment>
                <h2>Participant Signup</h2>
                <p style={{maxWidth: 700, margin: '0 auto', lineHeight: '150%'}}>
                    Please provide all the requested information. If you've already created an account and need to provide Akila with access to your Fitbit data, <Link to="/fitbit">click here</Link>
                </p>
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
                    onClick={this.submitForm}
                    variant="contained"
                    style={{color:'white', fontWeight:"bold", padding: "0.5rem 2rem", fontSize: "1rem"}}
                    color={"primary"} >
                    Submit
                </Button>
            </React.Fragment>
        );
    }
}

export default SignupForm;
