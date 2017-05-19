import React from 'react';
import * as Cookies from 'js-cookie';
import Logout from '../logout';
import UserData from '../userdata';
import Header from '../header'
import './index.css';
import {connect} from 'react-redux';
import {fetchQestions, fetchAnswers, fetchCurrentQIndex, fetchDataFromApi} from './actions';
import GuessForm from '../guess-form';

export class QuestionPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         questions: [],
    //         answers: [],
    //         currentQIndex: 3
    //     };
    // }

    componentDidMount(state) {
        this.props.dispatch(fetchDataFromApi())
        // const accessToken = Cookies.get('accessToken');
        // fetch('/api/questions', {
        //         headers: {
        //             'Authorization': `Bearer ${accessToken}`
        //         }
        //     }).then(res => {
        //     if (!res.ok) {
        //         throw new Error(res.statusText);
        //     }
        //     return res.json();
        // }).then((questions, state) => {
        //     console.log(questions.langs.length);
        //     let inQuestions = [];
        //     let inAnswers = [];
        //     for (let i=0; i< questions.langs.length; i++){
        //         inQuestions.push(questions.langs[i].jap);
        //         inAnswers.push(questions.langs[i].eng)
        //     }
        //     this.setState({
        //         ...state,
        //         questions: inQuestions,
        //         answers: inAnswers
        //     })
        // }
        // );
    }

    render() {
        // const questions = this.state.questions.map((question, index) =>
        //     <li key={index}>{question}</li>
        // );
        // const answers = this.state.answers.map((answer, index) => 
        //     <li key={index}>{answer}</li>
        // );
        // console.log('thequestion :', this.state.questions[this.state.currentQIndex]);
        // const questions = this.props.questions
        // // const answers = this.state.answers
        // const currentQIndex = this.state.currentQIndex

        // const currentQ= this.props.questions[0][this.state.currentQIndex];
        return (
            <ul className="question-list">
            <Header />
                <UserData />
                <p>Question</p>
                <ul>
                    
                    <p>Matching Answers</p>
                    
                    
                </ul>
                <GuessForm />
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    questions: state.dataFromAPI.questions,
    answers: state.dataFromAPI.answers,
    currentQIndex: state.dataFromAPI.currentQIndex,
    loading: state.dataFromAPI.loading
})

export default connect(mapStateToProps)(QuestionPage);