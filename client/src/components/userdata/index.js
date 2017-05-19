import React from 'react';
import {connect} from 'react-redux';
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
        let gitHubHandle = this.state.gitHubHandle;
        // let points = this.props.points;
        let name = this.state.name;

        return (
            <ul className="user-list three columns">
                <p>{gitHubHandle}<span>{name}</span></p>
                <ul className="userscores">
                    <li>Score: {this.props.points}</li>
                    <li>Correct {this.props.correct} </li>
                    <li>Wrong {this.props.wrong}</li>
                </ul>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    points: state.dataFromAPI.points,
    correct: state.UserData.correct,
    wrong: state.UserData.wrong

})

export default connect(mapStateToProps)(UserData);