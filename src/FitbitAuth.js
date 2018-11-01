import React from 'react';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button/Button";
import {getFitbitPermissions} from "./networking/networkingHelper";
import TextField from "./common/TextField";

class FitbitAuth extends React.Component{
    state = {
        email: '',
        password: '',
        selectedInput: null
    }
    componentDidMount() {
        const storedState = localStorage.getItem('storedState');
        if (!storedState) return;
        try {
            const parsedState = JSON.parse(storedState);
            this.setState({email: parsedState.form.email.value});
        }
        catch (err){
            console.log(err);
        }
    }
    setSelectedInput = (formKey) => {
        setTimeout(() => this.setState(state => ({
            ...state,
            selectedInput: formKey
        })), 0)
    }
    setFormField = (fieldName, {value}) => this.setState(state => ({
        ...state,
        [fieldName]: value
    }));
    startFitbitAuthFlow = () => {
        let email = this.state.email;
        if (!email || email.length ===  0){
            email = prompt("Enter the email address you used to register for Akila");
        }
        getFitbitPermissions(email);
    }
    render() {
        return (
            <div style={{minHeight: '56vh', position: 'relative'}}>
                <br/><br/>
                <h2>Link your FitBit Account</h2>
                <br/>
                <p>Please click the button below to be redirected to the Fitbit website in order to allow access to your activity data.</p>
                <p>You will need to sign in to the FitBit site using your fitbit account, which may be under a different email than the one you entered in the prior screen.</p>
                <br/>

                <div className="App">
                    <TextField
                        fieldName={"email"}
                        label={"Email"}
                        value={this.state.email}
                        setSelectedInput={this.setSelectedInput}
                        setFormField={this.setFormField}
                        currentlyFocused={this.state.selectedInput === "email"}
                    />

                    <TextField
                        fieldName={"password"}
                        label={"Password"}
                        type={"password"}
                        value={this.state.password}
                        setSelectedInput={this.setSelectedInput}
                        setFormField={this.setFormField}
                        currentlyFocused={this.state.selectedInput === "password"}
                    />
                </div>
                <br/>
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
                >
                    <Link to={"/"}>Previous</Link>
                </Button>
            </div>
        );
    }
}

export default FitbitAuth;