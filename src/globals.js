const apiUrl = "https://test.akila.ai:8181/health-services/api";
const lambdaUri = "https://v61caxldzi.execute-api.us-east-1.amazonaws.com/default/akila-auth0-signup-lambda";
const lambdaKey = "Q8vvkIUCrAaxkxEZ0OdQX48C9lIS816h1pBQVpZJ";

const FITBIT_REDIRECT_URI = window.location.href.indexOf('localhost') > -1 ?
    "http://localhost:3000/thankyou.html" :
    "https://www.akila.ai/onboarding/thankyou.html";
const FITBIT_AUTH_URL = "https://test.akila.ai:8181/wearables-integrator/fitbit/auth";

export {
    apiUrl,
    lambdaKey,
    lambdaUri,
    FITBIT_REDIRECT_URI,
    FITBIT_AUTH_URL
}