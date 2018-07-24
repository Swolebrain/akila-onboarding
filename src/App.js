import React, {Component} from 'react';
import TextField from './common/TextField';
import RadioField from './common/RadioField';
import MultiSelectField from './common/MultiSelectField';
import MultiCheckboxField from './common/MultiCheckboxField';
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
    setSelecetdInput = (formKey) => {
        setTimeout(() => this.setState(state => ({
            ...state,
            selectedInput: formKey
        })), 0)
    }
    componentDidUpdate() {
        localStorage.setItem("formState", JSON.stringify(this.state))
    }
    unSelect = (e) => {
        e.stopPropagation();
        this.setState(state => ({
            ...state,
            selectedInput: null
        }))
    }
    buildComponent = (formKey, formItem) => {
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
            default:
                return <TextField {...props} />;
        }
    };
    submitForm = e => {
        const {form} = this.state;
        const apiBody = {
            healthBehavior: {
                medicalHistory: {},
                exercisePatterns: {}
            },
            dietBehavior: {
                dietPatterns: {}
            }
        };
        this.state.formKeys.forEach(formKey=>{
            if (!form[formKey].submissionKey){
                apiBody[formKey] = getValue(formKey);
                return;
            }
            const path = form[formKey].submissionKey.split(".");
            // console.log(formKey, '--->', path);
            if (path.length === 1){
                apiBody[path[0]][formKey] = getValue(formKey);
                return;
            }
            else if (path.length === 2){
                apiBody[path[0]][path[1]][formKey] = getValue(formKey);
                return;
            }

        });
        console.log(apiBody)
        window.apiBody = apiBody;

        function getValue(formKey){
            switch (form[formKey].type){
                case "text": return form[formKey].value;
                case "email": return form[formKey].value;
                case "number": return Number(form[formKey].value);
                case "radio": {
                    const selected = form[formKey].values
                        .filter(value => value.selected);
                    return selected.length > 0 ?
                        (typeof selected[0].code === 'undefined' ? selected[0].label.toUpperCase() : selected[0].code)
                        : "";
                }
                case "checkbox": {
                    if (!form[formKey].secondaryType)
                        return form[formKey].
                            values.filter(value => value.selected)
                            .map(value => typeof value.code === 'undefined' ? value.label.toUpperCase() : value.code );

                    //this is only for medical conditions since it has a strange format in API:
                    const ret = {};
                    form[formKey].values.forEach(value => {
                        ret[value.key] = value.selected
                    });
                    return ret;
                }
            }
        }
    }
    render() {
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
