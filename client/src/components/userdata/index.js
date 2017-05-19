import React from 'react';
import {connect} from 'react-redux';
import {addCorrect, addWrong} from './actions';
import './index.css';
import * as Cookies from 'js-cookie';

export class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gitHubHandle: null,
            points: null,
            name: null,
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then((user) => {
            this.setState({
                gitHubHandle: user.gitHubHandle,
                points: user.points,
                name: user.name
            })
            }
        );
    }

    render() {
        let displayName = null;
        if (this.state.name=null){
            displayName= this.state.name;
        }else {
            displayName= this.state.gitHubHandle
        }

        return (
            <ul className="user-list two columns">
                <h4>{displayName}</h4>
                <ul className="userscores">
                    <li>Score: {this.props.points}</li>
                    <li>Correct: {this.props.correct} </li>
                    <li>Wrong: {this.props.wrong}</li>
                </ul>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    points: state.dataFromAPI.points,
    correct: state.userDataReducer.correct,
    wrong: state.userDataReducer.wrong

})

export default connect(mapStateToProps)(UserData);