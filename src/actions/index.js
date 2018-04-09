import axios from 'axios';

const API_KEY = '296b5aa2ab4030283fcea6d18619ddcb';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const HANDLE_PROMISE_REJECTED = 'HANDLE_PROMISE_REJECTED';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';

export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},us`;

    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}

export function handlePromiseRejected(){
    return {
      type: HANDLE_PROMISE_REJECTED
    };
}

export function clearErrorMessage(){
    return {
        type: CLEAR_ERROR_MESSAGE
    };
}

