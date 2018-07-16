function emailValidator(str, validationMsg){
    const valid = str === "" || str.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return valid || validationMsg || "Please enter a valid email address";
}

function stringValidator(str, validationMsg){
    const valid = str === "" || str.match(/^[A-z ,.;0-9]+$/);
    return valid || validationMsg || "Please enter a valid sequence of letters";
}

function heightValidator(str, validationMsg){
    const valid = str === "" || str.match(/^\d'\d{1,2}$/);
    return valid || validationMsg || "Please enter your height in feet, eg. 6'0";
}

function numericValidator(str, validationMsg){
    const valid = str === "" || str.match(/^\d+$/);
    return valid || validationMsg || "Please enter a valid number";
}

function numericFloatValidator(str, validationMsg){
    const valid = str === "" || str.match(/^\d+\.?\d*$/);
    return valid || validationMsg || "Please enter a valid number, eg. 4.5";
}


const validationMappings = {
    firstName: stringValidator,
    lastName: stringValidator,
    height: heightValidator,
    weight: numericValidator,
    age: numericValidator,
    A1CLevels: numericFloatValidator,
    floorsPerDay: numericValidator,
    daysOfExercisePerWeek: numericValidator,
    hoursOfExercisePerWeek: numericValidator,
    stepsPerDay: numericValidator,
    currentWeight: numericValidator,
    targetWeight: numericValidator,
    email: emailValidator
};

export default function getValidator(fieldName){
    return validationMappings[fieldName] || stringValidator
}