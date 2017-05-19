import React from 'react';
import {connect} from 'react-redux';
import {makeGuess} from './actions';

export class GuessForm extends React.Component {
    submitGuess(event) {
        event.preventDefault();
        const value = this.input.value;
        this.props.dispatch(makeGuess(value));
        this.input.value = '';
    }

    render() {
        return (
            <h2>Input Your Answer</h2>,
            <form onSubmit= {e =>this.submitGuess(e)}>
                <input type="text" name="userGuess" id="userGuess"
                    className="text" autoComplete="off"
                    placeholder="What is it in English?" required ref={input => this.input = input} />
                <input type="submit" id="guessButton" className="button" name="submit" value="Guess" />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    guesses: state.guesses
})

export default connect(mapStateToProps)(GuessForm);