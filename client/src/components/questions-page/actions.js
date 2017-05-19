import * as Cookies from 'js-cookie';

export const SET_CURRENT_Q_INDEX = "SET_CURRENT_Q_INDEX";
export const setCurrentQIndex = index => ({
    type: SET_CURRENT_Q_INDEX,
    index
});

export const SET_Q_ORDER = "SET_Q_ORDER";
export const setQOrder = qOrder => ({
    type: SET_Q_ORDER,
    qOrder
});

export const SET_Q_REQUEUE = "SET_Q_REQUEUE";
export const setQRequeue = () => ({
    type: SET_Q_REQUEUE
})

export const SET_Q_ENQUEUECUT = "SET_Q_ENQUEUECUT";
export const setQEnqueueCut = () => ({
    type: SET_Q_ENQUEUECUT
})

const fetchCurrentQIndex = () => ({
    type: 'FETCH_CURRENT_Q_INDEX'
})

const requestDataFromAPI = () => ({
  type: 'REQUEST_DATA'
})

const recieveDataFromAPI = (data) => ({
  type: 'RECIEVE_DATA',
  data
})

export const checkAnswer = () => {
  return dispatch => {
    console.log('checkAnswer CALLED.');
    if(this.state.guessForm.guesses[0] === this.state.dataFromAPI.answers[this.state.dataFromAPI.currentQIndex]) {
        console.log('correct!');
    }else {
        console.log('incorrect');
    }
  }
}

export const fetchDataFromApi = () => {
  return dispatch => {
    dispatch(requestDataFromAPI())
    
    const accessToken = Cookies.get('accessToken');
    fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
    })
    .then(res => {if (!res.ok) {throw new Error(res.statusText);}return res.json();})
    .then(json => dispatch(recieveDataFromAPI(json.langs)))
    .catch(ex => console.log('parsing failed', ex)) 
  }
}
