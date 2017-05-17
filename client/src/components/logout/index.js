import React from 'react';
import './index.css';

export default function Logout() {
    return <a className="logout" href={'/api/auth/logout'}>Logout</a>;
}
