import getValidator from "../validators";
import {
    apiUrl,
    lambdaKey,
    lambdaUri,
    FITBIT_REDIRECT_URI,
    FITBIT_AUTH_URL
} from "../globals";

export function buildApiBody(state){
    const {form} = state;
    const apiBody = {
        healthBehavior: {
            medicalHistory: {},
            exercisePatterns: {}
        },
        dietBehavior: {
            dietPatterns: {
                foodTypeLevels: {}
            }
        }
    };
    state.formKeys.forEach(formKey=>{
        if (!form[formKey].submissionKey){
            apiBody[formKey] = getValue(formKey);
            return;
        }
        const path = form[formKey].submissionKey.split(".");
        // console.log(formKey, '--->', path);
        if (path.length === 1){
            apiBody[path[0]][formKey] = getValue(formKey);
            return;
        }
        else if (path.length === 2){
            apiBody[path[0]][path[1]][formKey] = getValue(formKey);
            return;
        }
        else if (path.length === 3){
            if (!apiBody[path[0]][path[1]][path[2]]) apiBody[path[0]][path[1]][path[2]] = {};
            Object.assign(apiBody[path[0]][path[1]][path[2]], getValue(formKey));
            return;
        }

    });
    return apiBody;

    function getValue(formKey){
        switch (form[formKey].type){
            case "text": return form[formKey].value;
            case "password": return form[formKey].value;
            case "email": return form[formKey].value;
            case "number": return Number(form[formKey].value);
            case "radio": {
                const selected = form[formKey].values
                    .filter(value => value.selected);
                return selected.length > 0 ?
                    (typeof selected[0].code === 'undefined' ? selected[0].label.toUpperCase() : selected[0].code)
                    : "";
            }
            case "checkbox": {
                if (!form[formKey].secondaryType)
                    return form[formKey]
                        .values.filter(value => value.selected)
                        .map(value => typeof value.code === 'undefined' ? value.label.toUpperCase() : value.code );

                //this is only for medical conditions since it has a strange format in API:
                const ret = {};
                form[formKey].values.forEach(value => {
                    ret[value.key] = value.selected
                });
                return ret;
            }
            case "multicheckbox": {
                const selectedValues = form[formKey].values
                    .filter(value => value.selected !== "NONE")
                    .reduce((acc, value)=> {
                        acc[value.code] = value.selected;
                        return acc;
                    }, {});

                return selectedValues;
            }
            default: return form[formKey].value;
        }
    }
}

export function isValidForm(state){
    const {form} = state;
    return Object.keys(state.form).reduce((acc, formKey) => {
        if (!acc) return false;
        switch (formKey.type){
            case "text":
                return getValidator(formKey)(form[formKey].value) && acc;
            case "password":
                return getValidator(formKey)(form[formKey].value) && acc;
            case "email":
                return getValidator(formKey)(form[formKey].value) && acc;
            case "number":
                return getValidator(formKey)(form[formKey].value) && acc;
            case "radio":
                return form[formKey].values.filter(val => val.selected).length === 1 & acc;
            default: return acc;
        }
    }, true);
}

export async function submitForm(state){
    if (!isValidForm()) {
        alert("Please fix errors in form fields");
        return;
    }
    const apiBody = buildApiBody(state);
    try {
        const lambdaResponse = await fetch(lambdaUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': lambdaKey,
                'Accept' : 'application/json'
            },
            withCredentials: true,
            body: JSON.stringify({
                email: apiBody.email,
                password: apiBody.password,
                connection: 'Username-Password-Authentication'
            })
        });
        if (lambdaResponse.status !== 200) {
            console.log(lambdaResponse);
            throw {message: "Error response from API gateway (non 200 status)"};
        }
        const lambdaResponseJson = await lambdaResponse.json();
        console.log(lambdaResponseJson);
        if (!lambdaResponseJson._id) {
            throw {message: "Error response from API gateway (parsing Json)"};
        }

        delete apiBody.password;
        const akilaApiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...apiBody,
                auth0ID: lambdaResponseJson._id
            })
        });
        if (akilaApiResponse.status !== 200){
            console.log("Error while saving to akila internal system");
            throw {message: "Error while posting to AI API"};
        }
        const akilaApiResponseJson = akilaApiResponse.json();
        // if (akilaApiResponseJson){
        //     console.log("Error while saving to akila internal system");
        //     throw "Error while posting to AI API";
        // }
        console.log(akilaApiResponseJson);
        return akilaApiResponseJson;
    }
    catch (e) {
        console.log(e);
        alert("Something went wrong when creating account - " + e);
        return null;
    }
}

export function getFitbitPermissions(email){
    const body = {
        userEmail: email,
        redirectUri: FITBIT_REDIRECT_URI
    };
    console.log(body);
    console.log(FITBIT_AUTH_URL+'/start');
    return fetch(FITBIT_AUTH_URL + '/start', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(res=>{
            if (res.status === 200) return res.json();
            console.log('failure...', res);
            throw res;
        })
        .then(res => {
            console.log(res);
            //redirect to res.uri
            window.location.href = res.uri
        })
        .catch(err=>console.log(err.message))
}