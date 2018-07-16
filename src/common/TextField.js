import React from 'react';
import getValidator from '../validators'

export default class TextField extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            valid: true,
            validationText: ""
        };
        this.validator = getValidator(props.fieldName);
    }
    render(){
        const {fieldName, label, value, setFormField} = this.props;
        return (
            <div className="form-control text-input">
                <label
                    htmlFor={fieldName}>
                    {label}
                </label>
                <input
                    type="text"
                    id={fieldName}
                    value={value}
                    className="text-input"
                    onChange={event => {
                        const validationText = this.validator(event.target.value);
                        console.log(validationText, typeof validationText)
                        if (typeof validationText === 'string') {
                            this.setState({
                                valid: false,
                                validationText
                            })
                        }
                        else this.setState({
                            valid: true
                        })
                        setFormField(fieldName, {value: event.target.value});
                    }}
                />
                {
                    !this.state.valid && <h6 className={"errorMsg"}>
                        {this.state.validationText}
                        </h6>
                }
            </div>
        );
    }
}