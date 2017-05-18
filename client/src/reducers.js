import {combineReducers} from 'redux';
import app from './components/app/reducers';
import fetchQuestions from './components/questions-page/reducers';

export default combineReducers({
    app,
    fetchQuestions
});