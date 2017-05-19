import React from 'react';
import * as Cookies from 'js-cookie';
import Logout from '../logout';
import UserData from '../userdata';
import Header from '../header'
import './index.css';
import {connect} from 'react-redux';
import {fetchQestions, fetchAnswers, fetchCurrentQIndex, fetchDataFromApi, setCurrentQIndex, setQOrder} from './actions';
import GuessForm from '../guess-form';
import Queue from './queue';

export class QuestionPage extends React.Component {

    componentDidMount(state) {
        this.props.dispatch(fetchDataFromApi());
    }

    // componentWillReceiveProps(nextProps: Object) {
        
    //     console.log(this.props.questions);
    //     let q = new Queue(this.props.questions.length);
    //     console.log('Queue of Questions:  ', q);
    //     this.props.dispatch(setQOrder(q));
    //     console.log(q.first)
    //     this.props.dispatch(setCurrentQIndex(q.first.data));
    // }

    // componentDidUpdate() {
    //     console.log(this.props.questions);
    //     let q = new Queue(this.props.questions.length);
    //     console.log('Queue of Questions:  ', q);
    //     this.props.dispatch(setQOrder(q));
    //     console.log(q.first)
    //     this.props.dispatch(setCurrentQIndex(q.first.data));
    //     }

    // componentWillReceiveProps(nextProps, Object) {
    //     if(nextProps.questions !== this.props.questions) {
    //         console.log(this.props.questions);
    //         let q = new Queue(this.props.questions.length);
    //         console.log('Queue of Questions:  ', q);
    //         this.props.dispatch(setQOrder(q));
    //         console.log(q.first)
    //         this.props.dispatch(setCurrentQIndex(q.first.data));
    //     }
    // }


    render() {
        console.log(this.props.questions)
        const questions = this.props.questions.map((question, index) =>
            <li key={index}>{question}</li>)

        const answers = this.props.answers.map((answer, index) =>
            <li key={index}>{answer}</li>)
        

        return (
            <ul className="question-list">
            <Header />
                <UserData />
                <p>Question</p>
                <ul>
                {questions}
                </ul>
                <p>Matching Answers</p>
                <ul>
                {answers}
                </ul>
                <GuessForm />
            </ul>
        );
    }
}

const mapStateToProps = (state, props) => ({
    questions: state.dataFromAPI.questions,
    answers: state.dataFromAPI.answers,
    currentQIndex: state.dataFromAPI.currentQIndex,
    loading: state.dataFromAPI.loading,
    qOrder: state.dataFromAPI.qOrder 
})

export default connect(mapStateToProps)(QuestionPage);