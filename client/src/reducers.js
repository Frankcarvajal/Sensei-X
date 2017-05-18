import {combineReducers} from 'redux';
import app from './components/app/reducers';
import fetchQuestions from './components/questions-page/reducers';
import fetchAnswers from './components/guess-form/reducer';
import fetchCurrentQIndex from './components/guess-form/reducer';
import guessForm from './components/guess-form/reducer';

export default combineReducers({
    app,
    fetchQuestions,
    fetchAnswers,
    fetchCurrentQIndex,
    guessForm
});