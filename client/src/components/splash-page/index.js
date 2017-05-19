import React from 'react';
import senseiLogo from './images/senseix.png';
import './index.css';

export default function SplashPage() {
    return <div className='header'>
                <img src={senseiLogo} alt='senseiX' className="loginlogo" />
                <h1 className="what">LEARN JAPANESE THROUGH SPACED REPETITION</h1>
                <div className="loginbutton">
                    <a href={'/api/auth/github'} className="loginlink">Login / Get Started with Github</a>
                </div>  
            </div>
}
