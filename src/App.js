import React, {Component} from 'react';
import TextField from './common/TextField';
import RadioField from './common/RadioField';
import MultiSelectField from './common/MultiSelectField';
import {initialFormState} from './initialFormState.js'
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        selectedInput: null
    };
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
    componentDidUpdate() {
        localStorage.setItem("formState", JSON.stringify(this.state))
    }
    buildComponent = (formKey, formItem) => {
        const props = Object.assign(
            {key: formKey},
            { fieldName: formKey, setFormField: this.setFormField },
            formItem
        );
        switch (formItem.type){
            case "radio":
                return <RadioField {...props} />;
            case "checkbox":
                return <MultiSelectField {...props} />;
            default:
                return <TextField {...props} />;
        }
    };
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    {
                        this.state.formKeys.map((formKey, idx) => {
                            // if (idx > 3) return;
                            const formItem = this.state.form[formKey];

                            return this.buildComponent(formKey, formItem);
                        })
                    }
                </div>
                <Button
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
