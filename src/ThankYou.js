import React from 'react';
import {finishFitbitAuthFlow} from "./networking/networkingHelper";

class ThankYou extends React.Component{
    componentDidMount(){
        finishFitbitAuthFlow();
    }
    render(){
        return (
            <div>
                <h2>Onboarding Process</h2>
                <p>Thank you for your cooperation!</p>
                <p>Make sure you log in with the same email and password combination you picked during the signup
                    process.</p>
            </div>
        );
    }
}

export default ThankYou;