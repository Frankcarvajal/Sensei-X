import React from 'react';
import * as Cookies from 'js-cookie';
import {connect} from 'react-redux';
import QuestionPage from '../questions-page';
import SplashPage from '../splash-page';
import {createUser} from './actions';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.props.dispatch(createUser(currentUser))
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
            return <SplashPage />;
        }

        return <QuestionPage />;
    }
}

// Map state to props
const mapStateToProps = (state) => ({
    currentUser: state.app.currentUser
})

export default connect((mapStateToProps)(App));
