import {combineReducers} from 'redux';
import app from './components/app/reducers';
import dataFromAPI from './components/questions-page/reducers';
import guessForm from './components/guess-form/reducer';

export default combineReducers({
    app,
    dataFromAPI,
    guessForm
});