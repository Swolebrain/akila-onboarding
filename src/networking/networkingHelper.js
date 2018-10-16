import getValidator from "../validators";
import querystring from "querystring";
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
        // isAnonymous: true,
        firstName: 'dummy',
        lastName: 'dummyToo',
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
        if (formKey === 'passwordConf' || formKey ==='A1CLevels') return;
        let formValue = getValue(formKey);
        if (typeof formValue === 'undefined') formValue = null;
        if (!form[formKey].submissionKey){
            apiBody[formKey] = formValue;
            return;
        }
        const path = form[formKey].submissionKey.split(".");
        // console.log(formKey, '--->', path);
        if (path.length === 1){
            apiBody[path[0]][formKey] = formValue;
            return;
        }
        else if (path.length === 2){
            apiBody[path[0]][path[1]][formKey] = formValue;
            return;
        }
        else if (path.length === 3){
            if (!apiBody[path[0]][path[1]][path[2]]) apiBody[path[0]][path[1]][path[2]] = {};
            Object.assign(apiBody[path[0]][path[1]][path[2]], formValue);
            return;
        }

    });
    return apiBody;

    function getValue(formKey){
        switch (formKey){
            //handle special cases (due to strange or out of sync back end restrictions) first:
            case 'snacksPerDay': {
                const numericSnackNum = parseInt(form[formKey]);
                if (isNaN(numericSnackNum)) return 0;
                return numericSnackNum;
            }
            case 'restriction': {
                return form[formKey]
                    .values.filter(value => value.selected)
                    .map(value => typeof value.code === 'undefined' ? value.label.toUpperCase() : value.code )[0];
            }
            case 'medicalHistory': {
                const ret = {};
                form[formKey].values.forEach(value => {
                    ret[value.key] = value.selected
                });
                return ret;
            }
            case 'weight':{
                return {
                    value: Math.round(Number(form[formKey].value)/2.2),
                    unit: 'KG'
                };
            }
            case 'height':{
                return {
                    value: getNumericHeight(form[formKey].value),
                    unit: 'MT'
                };
            }
            //now handle things according to their type
            default: {
                switch (form[formKey].type){
                    case "text": return form[formKey].value;
                    case "date": return formatDate(form[formKey].value);
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
                        return form[formKey]
                            .values.filter(value => value.selected)
                            .map(value => typeof value.code === 'undefined' ? value.label.toUpperCase() : value.code );

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
    if (!isValidForm(state)) {
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
        const lambdaResponseJson = await lambdaResponse.json();
        console.log(lambdaResponseJson);

        if (lambdaResponse.status !== 200) {
            let details = "";
            lambdaResponseJson.fullAuth0Response = JSON.parse(lambdaResponseJson.fullAuth0Response)
            details += " - " + lambdaResponseJson.fullAuth0Response.description
            throw new Error("Error response from API gateway" + details);
        }

        let auth0ID = lambdaResponseJson._id || 'manual-reconciliation';

        delete apiBody.password;
        // console.log('###APIBODY', JSON.stringify(apiBody));
        const akilaApiResponse = await fetch(apiUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...apiBody,
                auth0ID
            })
        });

        if (akilaApiResponse.status !== 201){
            const akilaApiResponseJson = await akilaApiResponse.json();
            console.log('akilaResponseJson', akilaApiResponseJson);
            console.log("Error while saving to akila internal system");
            throw new Error("Error while posting to AI API - " + akilaApiResponseJson.message);
        }

        return true;
    }
    catch (e) {
        console.log(e);
        alert(e.toString());
        return null;
    }
}

export async function getFitbitPermissions(email){
    const savedUserData = await fetch(apiUrl + '/users/user?email=' + email).then(res => res.json());
    if (!savedUserData) alert("Error: Please create a user first");

    const body = {
        userEmail: email,
        redirectUri: FITBIT_REDIRECT_URI
    };
    console.log(FITBIT_AUTH_URL+'/start');
    console.log(body);
    return fetch(FITBIT_AUTH_URL + '/start/' + savedUserData.id + '?' + querystring.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: 'POST',
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


function formatDate(dateStr){
    const splitDate = dateStr.split('-');
    return splitDate[2] + "-" + ('0'+splitDate[0]).slice(-2) + "-" + ('0'+splitDate[1]).slice(-2);
}

function getNumericHeight(heightStr){
    const height = heightStr.split("'").map(Number);
    return Math.round((height[0]*12*2.54 + height[1]*2.54))/100;
}