import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioField = ({fieldName, label, values, setFormField, setSelectedInput, currentlyFocused}) => {
    let selectedValue = values.filter(v => v.selected)[0];
    // console.log(values);
    if (selectedValue && selectedValue.label) selectedValue = selectedValue.label;
    else selectedValue = "";
    return (
        <div className="form-control">
            <div className="label">{label}</div>
            <RadioGroup
                row
                aria-label={label}
                name={fieldName}
                value={selectedValue}
                onChange={createChangeHandler(values, setFormField, fieldName)}
                className={"options-container"}>
                {
                    values.map((radioField, idx) => (
                        <FormControlLabel
                            key={idx}
                            value={radioField.label}
                            label={radioField.label}
                            control={<Radio color={"primary"}/>}
                        />

                    ))
                }
            </RadioGroup>
        </div>
    );
}
/*
<span className={"radio-field"} key={radioField.label}>
                    <input
                        type="radio"
                        id={label + "__opt" + (idx+1)}
                        name={fieldName}
                        checked={radioField.selected}
                        onChange={}
                    />
                    <label htmlFor={label + "__opt" + (idx+1)}>
                        {radioField.label }
                    </label>
    </span>*/

export default RadioField;

const createChangeHandler = (values, setFormField, fieldName) => event => {
    console.log(event.target.name, event.target.checked, event.target.value);
    const valueIndex = values.findIndex(v => v.label === event.target.value);
    const newValues = values.map((val, idx) =>
        idx !== valueIndex
            ? {...val, selected: false}
            : {...val, selected: true});
    setFormField(fieldName, {values: newValues});
}