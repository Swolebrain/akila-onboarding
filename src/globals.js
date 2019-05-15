const auth0LoginUrl = 'https://akila-ai.auth0.com/oauth/token';
const lambdaUri = "https://v61caxldzi.execute-api.us-east-1.amazonaws.com/default/akila-auth0-signup-lambda";
const lambdaKey = "Q8vvkIUCrAaxkxEZ0OdQX48C9lIS816h1pBQVpZJ";
const isDev = window.location.href.indexOf('-dev') !== -1 ||  window.location.href.indexOf('localhost') !== -1;

let apiUrl = "https://prod.akila.ai/health-services/api";
if (isDev) apiUrl = "https://test.akila.ai:8181/health-services/api"

let FITBIT_REDIRECT_URI = window.location.href.indexOf('localhost') > -1 ?
    "http://localhost:3000/thankyou.html" :
    "https://akila.ai/onboarding/thankyou.html";
if (isDev) FITBIT_REDIRECT_URI = window.location.href.indexOf('localhost') > -1 ?
    "http://localhost:3000/thankyou.html" :
    "https://akila.ai/onboarding-dev/thankyou.html";

let FITBIT_AUTH_URL = "https://prod.akila.ai/wearables-integrator/fitbit/auth";
if (isDev) FITBIT_AUTH_URL = "https://test.akila.ai:8181/wearables-integrator/fitbit/auth";


export {
    apiUrl,
    auth0LoginUrl,
    lambdaKey,
    lambdaUri,
    FITBIT_REDIRECT_URI,
    FITBIT_AUTH_URL
}