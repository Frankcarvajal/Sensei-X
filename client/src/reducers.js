import {combineReducers} from 'redux';
import app from './components/app/reducers';
import questionsReducer from './components/questions-page/reducers';

export default combineReducers({
    app,
    questionsReducer
});