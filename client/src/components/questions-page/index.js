import React from 'react';
import { connect } from "react-redux"
import * as Cookies from 'js-cookie';
// import Logout from '../logout';
import UserData from '../userdata';
import Header from '../header';
import Queue from './queue';
import { setCurrentQIndex, setQOrder } from "./actions";
import './index.css';

class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: [],
            currentQIndex: 3

        };
    }

    componentDidMount(state) {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then((questions, state) => {
            console.log(questions.langs.length);
            let inQuestions = [];
            let inAnswers = [];
            for (let i=0; i< questions.langs.length; i++){
                inQuestions.push(questions.langs[i].jap);
                inAnswers.push(questions.langs[i].eng)
            }
            this.setState({
                ...state,
                questions: inQuestions,
                answers: inAnswers
            })
            let q = new Queue(questions.langs.length);
            console.log('Queue of Questions:  ', q);
            this.props.dispatch(setQOrder(q));
            this.props.dispatch(setCurrentQIndex(q.first.data));
            }
        );
    }

// 1. render UserData when component ready
    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );
        const answers = this.state.answers.map((answer, index) => 
            <li key={index}>{answer}</li>
        );
        const currentQ= this.state.questions[this.props.currentQIndex];
        return (
            <ul className="question-list">
            <Header />
                <UserData />
                
                <p>Question</p>
                <ul>
                    {questions}
                    <p>Matching Answers</p>
                    {answers}
                    <h3>{currentQ}</h3>
                </ul>
                <h3>Input Answer</h3>
                <form>
                    <input type="text" name="answer" placeholder="Enter translation" />
                    <input type="submit" value="Submit" />
                </form>
            </ul>
        );
    }
}

const mapStateToProps = function(state, prop) {
  return { 
      currentQIndex: state.questionsReducer.currentQIndex, 
      qOrder: state.questionsReducer.qOrder }
}

export default connect(mapStateToProps)(QuestionPage);