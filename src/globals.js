const apiUrl = "https://prod.akila.ai/health-services/api";
const auth0LoginUrl = 'https://akila-ai.auth0.com/oauth/token';
const lambdaUri = "https://v61caxldzi.execute-api.us-east-1.amazonaws.com/default/akila-auth0-signup-lambda";
const lambdaKey = "Q8vvkIUCrAaxkxEZ0OdQX48C9lIS816h1pBQVpZJ";

const FITBIT_REDIRECT_URI = window.location.href.indexOf('localhost') > -1 ?
    "http://localhost:3000/thankyou.html" :
    "https://www.akila.ai/onboarding/thankyou.html";
const FITBIT_AUTH_URL = "https://prod.akila.ai/wearables-integrator/fitbit/auth";

export {
    apiUrl,
    auth0LoginUrl,
    lambdaKey,
    lambdaUri,
    FITBIT_REDIRECT_URI,
    FITBIT_AUTH_URL
}