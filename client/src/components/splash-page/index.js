import React from 'react';
import senseiLogo from './images/senseiX.png';
import './index.css';

export default function SplashPage() {
    return <div className='header'>
                <img src={senseiLogo} alt='senseiX' className="logo" />
                <a href={'/api/auth/github'} className="loginlink">Login / Get Started with Github</a>
            </div>
}
