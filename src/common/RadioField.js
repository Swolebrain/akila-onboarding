import React from 'react';

const RadioField = ({fieldName, label, values, setFormField}) => (
    <div className="form-control">
        <div>{label}</div>
        {
            values.map((radioField, idx) => (
                <span className={"radio-field"} key={radioField.label}>
                    <label for={label + "__opt" + (idx+1)}>
                        {radioField.label }
                    </label>
                    <input
                        type="radio"
                        id={label + "__opt" + (idx+1)}
                        name={fieldName}
                        checked={radioField.selected}
                        onChange={createChangeHandler(values, setFormField)}
                    />
                </span>
            ))
        }
    </div>
);

export default RadioField;

const createChangeHandler = (values, setFormField) => event => {
    console.log(event.target.name, event.target.checked);
}