import React from 'react';
import logo from '../logo.png'

function Logo() {
    return (
        <div className="logo-wrapper">
            <span className="logo-text">cnpm-stat</span>
            <img src={logo} className="logo-icon" alt="" />
        </div>
    )
}
export default Logo;