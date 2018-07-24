import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const MultiSelectField = ({fieldName, label, values, setFormField, choices}) => (
    <div className="form-control">
        <div className="label" style={{fontWeight: 'bold'}}>{label}</div>
        <div className={"options-container"} style={{alignSelf: 'stretch'}}>
            {
                values.map(
                    ({label, selected, code}, idx) => (
                        <div style={{display: 'flex', margin: '0.5rem 0'}} key={idx}>
                            <InputLabel
                                style={{display: 'flex', flex: 2.5, alignItems: 'center'}}
                                htmlFor={`${fieldName}-${code}`}>
                                {label}
                            </InputLabel>
                            <Select inputProps={{id: `${fieldName}-${code}`}}
                                    style={{flex:1}}
                                    value={selected}
                                    onChange={createChangeHandler(values, setFormField, fieldName, idx)}>
                                {
                                    choices.map((choice, idx) => (
                                        <MenuItem value={choice} key={idx}>
                                            {choice[0] + choice.slice(1).toLowerCase()}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    )
                )
            }
        </div>
    </div>
);


export default MultiSelectField;



const createChangeHandler = (values, setFormField, fieldName, valueIndex) => event => {
    const newSelected = event.target.value;

    const newValues = values.map((valueEntry, idx)=> {
        if (idx !== valueIndex) return valueEntry;
        return {
            ...valueEntry,
            selected: newSelected
        }
    });
    setFormField(fieldName, {values: newValues});
}