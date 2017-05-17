import React from 'react';
import './index.css';

export default class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/user/:gitHubId', {
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
                user
            })
            }
        );
    }

    render() {
        const user = this.state.user.map((user, index) =>
            <li key={index}>{user}</li>
        );

        return (
            <ul className="user-list">
                <p>{user}</p>
                <ul className="userscores">
                    <li>Score </li>
                    <li>Correct </li>
                    <li>Wrong </li>
                </ul>
            </ul>
        );
    }
}
