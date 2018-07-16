import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const MultiSelectField = ({fieldName, label, values, setFormField}) => (
    <div className="form-control">
        <div className="label">{label}</div>
        <div className={"options-container"}>
            {
                values.map(
                    ({label, selected}, idx) => (
                        <span className={"checkbox-field"} key={`${fieldName}__opt${idx}`}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={fieldName}
                                    id={`${fieldName}__opt${idx}`}
                                    checked={selected}
                                    onChange={createChangeHandler(values, setFormField, fieldName, idx)}
                                    value={label}
                                    color={"primary"}
                                />
                            }
                            label={label}
                        />
                    </span>
                    )
                )
            }
        </div>
    </div>
);

//<label htmlFor={`${fieldName}__opt${idx}`}>{label}</label>

export default MultiSelectField;



const createChangeHandler = (values, setFormField, fieldName, valueIndex) => event => {
    const newValues = values.map((val, idx) =>
        idx !== valueIndex
            ? val
            : {...val, selected: !val.selected});
    setFormField(fieldName, {values: newValues});
}