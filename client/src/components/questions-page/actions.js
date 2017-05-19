import * as Cookies from 'js-cookie';

const fetchQuestions = () => ({
    type: 'FETCH_QUESTIONS'
})

const fetchAnswers = () => ({
    type: 'FETCH_ANSWERS'
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
