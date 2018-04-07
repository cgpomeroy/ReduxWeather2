import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import HandlePromiseRejected from './reducer_error_message';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  error: HandlePromiseRejected
});

export default rootReducer;
