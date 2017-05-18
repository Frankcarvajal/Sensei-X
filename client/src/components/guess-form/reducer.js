import {MAKE_GUESS} from './actions';

const initialState = {
    guesses: []
}

export default (state=initialState, action) => {
    if(action.type === MAKE_GUESS) {
        return {
            ...state,
            guesses: state.guesses.concat(action.guess)
        }
    }
    return state;
}