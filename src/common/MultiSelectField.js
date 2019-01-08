import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const MultiSelectField = ({fieldName, label, values, setFormField, setSelectedInput, currentlyFocused}) => (
    <div className="form-control">
        <div className="label">{label}</div>
        <div className={"options-container"}>
            {
                values.map(
                    ({label:innerLabel, selected, code}, idx) => (
                        <span className={"checkbox-field"} key={`${fieldName}__opt${idx}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={fieldName}
                                        id={`${fieldName}__opt${idx}`}
                                        checked={selected}
                                        onChange={createChangeHandler(values, setFormField, fieldName, idx)}
                                        value={code || innerLabel}
                                        color={"primary"}
                                    />
                                }
                                label={innerLabel || console.log(values[idx]) || "yo" }
                            />
                        </span>
                    )
                )
            }
        </div>
    </div>
);


export default MultiSelectField;



const createChangeHandler = (values, setFormField, fieldName, valueIndex) => event => {
    const newValues = values.map((val, idx) =>
        idx !== valueIndex
            ? val
            : {...val, selected: !val.selected});
    setFormField(fieldName, {values: newValues});
}