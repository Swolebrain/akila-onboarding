import React, {Component} from 'react';
import {initialFormState} from './initialFormState.js'
import './App.css';

class App extends Component {
    state = {
        form: initialFormState,
        selectedInput
    }
    setFormField = (fieldName, value) => this.setState(state => ({
        ...state,
        form: {
            ...state.form,
            [fieldName]: value
        }
    }))
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default App;
