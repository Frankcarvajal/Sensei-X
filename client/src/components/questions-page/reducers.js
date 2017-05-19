import * as actions from "./actions";

const initialQState= {
    currentQIndex: 0,
    qOrder: null
}

const questionsReducer = (state = initialQState, action) => {
    if (action.type === actions.SET_CURRENT_Q_INDEX) {
        return {
            ...state,
            currentQIndex: action.index
        }
    } else if (action.type === actions.SET_Q_ORDER) {
        return {
            ...state,
            qOrder: action.qOrder
        }
    }
    return state;
}

export default questionsReducer;