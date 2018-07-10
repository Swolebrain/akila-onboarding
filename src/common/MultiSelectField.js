import React from 'react';

const MultiSelectField = ({fieldName, label, values, setFormField}) => (
    <div className="form-control">
        <div>{label}</div>
        {
            (function(){
                return Object.keys(values).map(
                    (key, idx) => (
                        <span className={"checkbox-field"}>
                            <label htmlFor={`${fieldName}__opt${idx}`}>{getLabel(key)}</label>
                            <input
                                type="checkbox"
                                name={fieldName}
                                id={`${fieldName}__opt${idx}`}
                                checked={values[key]}
                                onChange={createChangeHandler(values, setFormField)}
                            />
                        </span>
                    )
                )
            }())
        }
    </div>
);

export default MultiSelectField;


function getLabel(str){
    if (typeof str !== 'string') return null;
    if (str.indexOf("_") === -1) return str[0].toUpperCase() + str.slice(1);

    return str.split("_").map(token => token[0].toUpperCase() + token.slice(1)). join(" ");
}

const createChangeHandler = (values, setFormField) => event => {
    console.log(event.target.name, event.target.checked);
}