import {CREATE_USER} from './actions';

const initialState = {
    currentUser: null
}

export default (state=initialState, action) => {
    if(action.type === CREATE_USER) {
        return {
            ...state,
            currentUser: action.currentUser
        }     
    }
    return state;
}