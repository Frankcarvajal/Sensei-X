import {FETCH_QUESTIONS, FETCH_ANSWERS, FETCH_CURRENT_Q_INDEX} from './actions';

const initialState = {
    questions: [],
    answers: [],
    currentQIndex: 0
}

export default (state=initialState, action) => {
    if(action.type === FETCH_QUESTIONS) {
        return {
            ...state,
            questions: action.questions
        }
    }
    if(action.type === FETCH_ANSWERS) {
        return {
            ...state,
            answers: action.answers
        }
    }
    if(action.type === FETCH_CURRENT_Q_INDEX) {
        return {
            ...state,
            currentQIndex: action.currentQIndex
        }
    }
    return state;
}