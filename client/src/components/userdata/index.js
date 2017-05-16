import React from 'react';

export default class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/user/', {
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
        const user = this.state.user.map((question, index) =>
            <li key={index}>{question}</li>
        );

        return (
            <ul className="question-list">
                <p>Username</p>
                <ul>
                    <li>Score </li>
                    <li>Correct </li>
                    <li>Wrong </li>
                </ul>
            </ul>
        );
    }
}
