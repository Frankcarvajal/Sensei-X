import React from 'react';
import * as Cookies from 'js-cookie';
import Logout from '../logout';
// import UserData from '../userdata';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: []
        };
    }

    componentDidMount() {
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
        }).then((questions) => {
            console.log(questions.langs.length);
            let inQuestions = [];
            let inAnswers = [];
            for (let i=0; i< questions.langs.length; i++){
                inQuestions.push(questions.langs[i].jap);
                inAnswers.push(questions.langs[i].eng)
            }
            this.setState({
                questions: inQuestions,
                answers: inAnswers
            })
        }
        );
    }

// render UserData when component ready
    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );
        const answers = this.state.answers.map((answer, index) => 
            <li key={index}>{answer}</li>
        );

        return (
            <ul className="question-list">
                <h1>Sensei X</h1>
                <h4>Stop</h4>
                <Logout />
                <p>Username</p>
                <ul>
                    <li>Score </li>
                    <li>Correct </li>
                    <li>Wrong </li>
                </ul>
                <p>Question</p>
                <ul>{
                    questions}
                    <p>Matching Answers</p>
                    {answers}

                </ul>
                <h3>Input Answer</h3>
                <form>
                    Answer:
                    <input type="text" name="firstname" placeholder="Enter translation" />
                    <input type="submit" value="Submit" />
                </form>
            </ul>
        );
    }
}
