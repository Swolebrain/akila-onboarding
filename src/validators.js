function emailValidator(str){
    const valid = str === "" || str.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return valid || "Please enter a valid email address";
}

function stringValidator(str){
    const valid = str === "" || str.match(/^[A-z ,.;0-9]+$/);
    return valid || "Please enter a valid sequence of letters";
}

function heightValidator(str){
    // const valid = str === "" || str.match(/^\d'\d{1,2}$/);
    // return valid || "Please enter your height in feet, eg. 6'0";
    const valid = str === "" || str.match(/^\d+$/);
    return valid || "Please enter height in inches";
}

function numericValidator(str){
    const valid = str === "" || str.match(/^\d+$/);
    return valid || "Please enter a valid number";
}

function numericFloatValidator(str){
    const valid = str === "" || str.match(/^\d+\.?\d*$/);
    return valid || "Please enter a valid number, eg. 4.5";
}

function dateValidator(str){
    const valid = str === "" || str.match(/^\d{1,2}[/-]\d{1,2}[-/]\d{4}$/);
    return valid || "Please enter date of birth in format mm-dd-yyyy";
}

function phoneNumberValidator(str){
    const valid = str === "" || str.match(/^\(*\d{3}\)*[- ]*\d{3}[ -]*\d{4}$/);
    return valid || "Please enter a valid 10 digit phone number";
}


const validationMappings = {
    firstName: stringValidator,
    lastName: stringValidator,
    height: heightValidator,
    weight: numericValidator,
    dateOfBirth: dateValidator,
    lastCheckUp: dateValidator,
    phoneNumber: phoneNumberValidator,
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



/*
    API FORMAT:
    {
    "firstName": "Fabio",
    "lastName": "Turizo",
    "dateOfBirth": "1987-01-23",
    "gender": "MALE",
    "email": "fabio.turizo@payara.fish",
    "phoneNumber": null,
    "ethnicityCode": "LAT",
    "healthBehavior": {
        "height": 1.77,
        "weight": 82,
        "lastCheckUp": "2018-07-01",
        "adequateSleepPattern": true,
        "stressLevel": "LOW",
        "medicalHistory": {
            "heartConditions": false,
            "hypertension": false,
            "respiratoryIllness": false,
            "physicalInjuries": false
        },
        "exercisePatterns": {
            "days": [
                "MONDAY",
                "FRIDAY"
            ],
            "types": [
                "CARDIO",
                "JOGGING"
            ]
            "level": "MEDIUM",
            "hoursPerDay": 2,
            "floorsPerDay": 0,
            "stepsPerDay": 150,
        }
    },
    "dietBehavior": {
        "hasBreakfast": true,
        "hasLunch": true,
        "hasDinner": true,
        "snacksPerDay": 2,
        "snackPreferences": [
            "FRUIT",
            "NUTS"
        ],
        "waterPerDay": 10,
        "alcoholConsumedOn": [
            "FRIDAY",
            "SATURDAY"
        ],
        "drinksPerDay": 0,
        "beveragePreferences": [
            "COFFEE",
            "JUICE"
        ],
        "timeForBeverages": "LATE_NIGHT", **
        "restriction": null,
        "dietPatterns": {
            "foodTypeLevels": {
                "MEAT": "LOW",
                "GRAINS": "HIGH",
                "POULTRY": "MEDIUM",
                "HIGH_GLYC": "HIGH"
            },
            "fruitsPreference": "LIKE",
            "vegetablesPreference": "LIKE"
        }
    }
}
*
* */