import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import '../../css/main.css';
import '../../css/normalize.css';
import '../../css/skeleton.css';
import senseiLogo from './images/senseilogo.png';
import Logout from '../logout';

export function Header (props) {
  let userName = (props.currentUser) ? (
      <div className='user'>
        <p>{props.currentUser.displayName}</p>
      </div>

  ) : null;
  return (
    <div className="row">
        <div className="twelve column">
            <div className='header'>
                <img src={senseiLogo} alt='senseiX' className="logo" />
                {userName}
                <Logout />
            </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    currentUser: state.app.currentUser
})

export default connect(mapStateToProps)(Header);