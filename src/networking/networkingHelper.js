import getValidator from "../validators";
import querystring from "querystring";
import {
    apiUrl,
    lambdaKey,
    lambdaUri,
    FITBIT_REDIRECT_URI,
    FITBIT_AUTH_URL, auth0LoginUrl
} from "../globals";
const jwt = require('jsonwebtoken');

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
        if (formKey === 'passwordConf') return;
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
                const numericSnackNum = parseInt(form[formKey], 10);
                if (isNaN(numericSnackNum)) return 0;
                return numericSnackNum;
            }
            case 'hoursPerDay': {
                const numericMinutes = parseInt(form[formKey], 10);
                if (isNaN(numericMinutes)) return 0;
                return numericMinutes/60;
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
    const errorFields = [];
    const validationResult =  state.formKeys.reduce((acc, formKey) => {
        if (!acc) return false;
        let workingVal = false;
        // console.log('validating',form[formKey], getValidator(formKey)(form[formKey].value));
        switch (form[formKey].type){
            case "text":
                workingVal = getValidator(formKey)(form[formKey].value); break;
            case "password":
                workingVal = getValidator(formKey)(form[formKey].value); break;
            case "email":
                workingVal = getValidator(formKey)(form[formKey].value); break;
            case "number":
                workingVal = getValidator(formKey)(form[formKey].value); break;
            case "radio":
                workingVal = form[formKey].values.filter(val => val.selected).length === 1;
                if (!workingVal) errorFields.push("You must select at least one entry in " + form[formKey].label);
                break;
            case "date":
                workingVal = getValidator(formKey)(form[formKey].value);
                break;
            case "multicheckbox":
                return true;
            default: return acc;
        }
        if (typeof workingVal === 'string'){
            errorFields.push(form[formKey].label + ': ' + workingVal);
            return false;
        }

        return workingVal;
    }, true);

    return errorFields;
}



export async function submitForm(state){
    const formFieldErrors = isValidForm(state);
    if (formFieldErrors.length > 0) {
        alert(formFieldErrors.join("\n"));
        return;
    }
    const apiBody = buildApiBody(state);
    apiBody.identity = "endUser";
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
        console.log(lambdaResponseJson); //either has an _id field or already exists. if it exists i need it to send id as well

        if (lambdaResponse.status !== 200) {
            let details = "";
            try {
                details += " - " + JSON.parse(lambdaResponseJson.fullAuth0Response).details
            }
            catch(e){
                console.log(e);
                details += " - " + lambdaResponseJson.fullAuth0Response
            }
            throw new Error("Error response from API gateway" + details);
        }

        // let auth0ID = lambdaResponseJson._id;
        // apiBody.identity = 'auth0|'+auth0ID;
        let tokenData = jwt.decode(lambdaResponseJson.loginResult.access_token);
        apiBody.identity = tokenData.sub;

        delete apiBody.password;
        console.log(apiBody.identity);
        console.log('###APIBODY', apiBody);
        const akilaApiResponse = await fetch(apiUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + lambdaResponseJson.loginResult.access_token
            },
            body: JSON.stringify(apiBody)
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

export async function getFitbitPermissions(email, password){
    const loginResult = await fetch(auth0LoginUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'password',
            client_id: 'OXla466wNDEw7Y1JZZXE6cwRV5GCI6HQ',
            audience: 'https://api.akila.ai/',
            username: email,
            password,
            realm: "Username-Password-Authentication",
            scope: 'profile email',
        })
    }).then(res=>res.json());

    console.log(loginResult);
    localStorage.setItem("accessToken", loginResult.access_token);


    const body = {
        userEmail: email,
        redirectUri: FITBIT_REDIRECT_URI
    };
    console.log(FITBIT_AUTH_URL+'/start');
    console.log(body);
    return fetch(FITBIT_AUTH_URL + '/start/' + 0 + '?' + querystring.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + loginResult.access_token
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
            window.location = res.uri
        })
        .catch(err=>console.log(err.message))
}

export async function finishFitbitAuthFlow(){
    const token = localStorage.getItem("accessToken");
    if (!token) return alert ("Error! Not authenticated");

    const qStr = window.location.search;
    if (!qStr || qStr.length <= 1) return;

    const params = qStr.slice(1).split("&");
    if (params.length !== 2) return;

    const payload = {};
    params.forEach(function(param){
        const kv = param.split("=");
        payload[kv[0]] = kv[1];
    });
    console.log(payload);

    return fetch("https://test.akila.ai:8181/wearables-integrator/fitbit/auth" + '/complete/0' , {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify(payload)
    })
        .then(res=>{
            if (res.status === 200) return res.json();
            console.log('failure...', res);
            throw res;
        })
        .then(res => {
            console.log(res);
        })
        .catch(err=>{
            alert('there was a problem');
            console.log(err);
        });
}


function formatDate(dateStr){
    const splitDate = dateStr.split('-');
    return splitDate[2] + "-" + ('0'+splitDate[0]).slice(-2) + "-" + ('0'+splitDate[1]).slice(-2);
}

function getNumericHeight(heightStr){
    const height = heightStr.split("'").map(Number);
    return Math.round((height[0]*12*2.54 + height[1]*2.54))/100;
}