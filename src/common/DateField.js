import React from 'react';
import getValidator from '../validators';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    formField: {
        margin: '0 4px',
        minWidth: 65
    }
}

class DateField extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            valid: true,
            validationText: ""
        };
        this.validator = getValidator(props.fieldName);
    }
    getFocus = () => {
        if (this.input) this.input.focus();
        this.props.setSelectedInput(this.props.fieldName);
    };
    render(){
        const {fieldName, label, value, setFormField, currentlyFocused} = this.props;
        const splitValue = (value || '--').split('-');
        const focusedStyle = currentlyFocused ? {borderBottomColor: "rgba(255, 51, 0, 0.7)"} : {};
        const emailFieldStyle = fieldName === 'passwordConf' ? {marginBottom: '0.25rem'} : {};
        console.log(value);
        return (
            <div
                style={Object.assign(focusedStyle, emailFieldStyle)}
                className="form-control text-input"
                onClick={this.getFocus}>
                <label>
                    {label}
                </label>
                <FormControl style={styles.formField}>
                    <Select
                        value={splitValue[0]}
                        onChange={e =>
                            setFormField(fieldName,
                                {
                                    value: [
                                            e.target.value,
                                            splitValue[1],
                                            splitValue[2]
                                        ].join('-')
                                }
                            )
                        }
                    >
                        {
                            ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx)=>
                                <MenuItem style={{padding: '2px 4px'}} value={idx ? (""+idx) :''} key={idx}>{month}</MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText>Month</FormHelperText>
                </FormControl>

                <FormControl style={styles.formField}>
                    <Select
                        onChange={e =>
                            setFormField(fieldName,
                                {
                                    value: [
                                        splitValue[0],
                                        e.target.value,
                                        splitValue[2]
                                    ].join('-')
                                }
                            )
                        }
                        value={splitValue[1]}>
                        <MenuItem value={''}></MenuItem>
                        {
                            Array(31).fill('').map((_,i) => i+1).map((day, idx)=>
                                <MenuItem style={{padding: '2px 4px'}} value={idx ? (""+day) :''} key={idx}>{day}</MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText style={{textAlign: 'center'}}>Day</FormHelperText>
                </FormControl>

                <FormControl style={styles.formField}>
                    <Select
                        onChange={e =>
                            setFormField(fieldName,
                                {
                                    value: [
                                        splitValue[0],
                                        splitValue[1],
                                        e.target.value
                                    ].join('-')
                                }
                            )
                        }
                        value={splitValue[2]}>
                        <MenuItem value={''}></MenuItem>
                        {
                            Array(121).fill('').map((_,i) => new Date().getFullYear() - i).map((year, idx)=>
                                <MenuItem style={{padding: '2px 4px'}} value={""+year} key={idx}>{year}</MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText style={{textAlign: 'center'}}>Year</FormHelperText>
                </FormControl>

                </div>
        );
    }
}

export default withStyles(styles)(DateField);

/*<SingleDatePicker
    numberOfMonths={1}
    date={value}
    onDateChange={(date) => setFormField(fieldName, {value: date}) }
    focused={true}
    onFocusChange={() => ""}
    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
    id={fieldName}
/>*/