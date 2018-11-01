import React from 'react';
import getValidator from '../validators';
import PropTypes from 'prop-types';

export default class TextField extends React.PureComponent{
    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        setSelectedInput: PropTypes.func.isRequired,
        setFormField: PropTypes.func.isRequired,
        currentlyFocused: PropTypes.bool.isRequired,
    }
    constructor(props){
        super(props)
        this.state = {
            valid: true,
            validationText: ""
        };
        this.validator = getValidator(props.fieldName, document);
    }
    getFocus = () => {
        if (this.input) this.input.focus();
        this.props.setSelectedInput(this.props.fieldName);
    };
    render(){
        const {fieldName, label, value, setFormField, currentlyFocused} = this.props;
        const focusedStyle = currentlyFocused ? {borderBottomColor: "rgba(255, 51, 0, 0.7)"} : {};
        const emailFieldStyle = fieldName === 'passwordConf' ? {marginBottom: '0.25rem'} : {};
        return (
            <React.Fragment>

                <div
                    style={Object.assign(focusedStyle, emailFieldStyle)}
                    className="form-control text-input"
                    onClick={this.getFocus}>
                    <label
                        htmlFor={fieldName}>
                        {label}
                    </label>
                    <input
                        type={this.props.type || "text"}
                        id={fieldName}
                        ref={elm=>this.input = elm}
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
                {
                    fieldName === 'passwordConf' &&
                    <div style={{color: '#666', fontSize: '0.75rem', marginBottom: '1.25rem', maxWidth: '275px', fontWeight: 'bold'}}>
                        Please remember this username and password, it will be required to log into the mobile app.
                    </div>
                }
            </React.Fragment>
        );
    }
}