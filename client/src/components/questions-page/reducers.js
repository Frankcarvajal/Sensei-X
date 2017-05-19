import * as actions from './actions';
import Queue from './queue';

const initialState = {
    questions: [],
    answers: [],
    currentQIndex: 0,
    qOrder: {},
    points: 0,
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

    case 'FETCH_CURRENT_Q_INDEX':
        return {
            ...state,
            currentQIndex: action.currentQIndex
        }

    case 'SET_CURRENT_Q_INDEX':
        return {
            ...state,
            currentQIndex: action.index
        }

    case 'SET_Q_ORDER':
        return {
            ...state,
            qOrder: action.qOrder
        }

    case 'SET_Q_REQUEUE':
        let q1= state.qOrder;
        q1.requeue();
        let ci1 = q1.first.data;
        return {
            ...state,
            currentQIndex: ci1,
            qOrder: q1
        }
    case 'SET_Q_ENQUEUECUT':
        let q2= state.qOrder;
        q2.enqueueCut();
        let ci2 = q2.first.data;
        return {
            ...state,
            currentQIndex: ci2,
            qOrder: q2
        }
    case 'ADD_POINT':
        let updatedPoints = state.points+1;
        return {
            ...state,
            points: updatedPoints
        }

    default: return state
  }
}

export default dataFromAPI
