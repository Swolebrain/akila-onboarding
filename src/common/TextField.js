import React from 'react';

const TextField = ({fieldName, label, value, setFormField}) => (
    <div className="form-control">
        <label htmlFor={fieldName}>{label}</label>
        <input
            type="text"
            id={fieldName}
            value={value}
            className="text-input"
            onChange={text => setFormField(fieldName, text)}
        />
    </div>
);

export default TextField;