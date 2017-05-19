import * as actions from './actions';

const initialState = {
    questions: [],
    answers: [],
    currentQIndex: 0,
    loading: false
}

const dataFromAPI = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_DATA':
      return {
        ...state,
        loading: true
      }

    case 'RECIEVE_DATA': 
    // console.log(action.data);
        let inQuestions = [];
        let inAnswers = [];
        for (let i=0; i< action.data.length; i++){
            inQuestions.push(action.data[i].jap);
            inAnswers.push(action.data[i].eng)
        }  
      return {
        ...state,
        loading: false,
        questions: inQuestions,
        answers: inAnswers,
        currentQIndex: action.data.currentQIndex
      }
    
    case 'FETCH_QUESTIONS':
        return {
            ...state,
            questions: action.questions
        }

    case 'FETCH_ANSWERS':
        return {
            ...state,
            answers: action.answers
        }

    case 'FETCH_CURRENT_Q_INDEX':
        return {
            ...state,
            currentQIndex: action.currentQIndex
        }

    default: return state
  }
}

export default dataFromAPI
