import * as actions from './actions';

const initialState = {
    correct: 0,
    wrong: 0
}

const userDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CORRECT':
      let updatedCorrect = state.correct+1;
      return {
        ...state,
        correct: updatedCorrect
    }
    case 'ADD_WRONG':
      let updatedWrong = state.wrong+1;
      return {
        ...state,
        wrong: updatedWrong
    }
  }
  return state;
}

export default userDataReducer