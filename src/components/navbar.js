import React, { Component } from 'react';
import '../asserts/css/navbar.scss';

class Navbar extends Component {
   
    render(){
        return(
            <div className="my-content">
                <nav id="my-navbar" className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img style={{ width : '50px', height : '50px' }} id="VES_logo" src="/images/VES_logo.png" alt="profile"/>
                        <span id="vesit-logo">VESIT EVENT</span>
                    </a>
                    <a id="addevent-button-home-page" className="navbar-item d-flex align-items-center" href="/addevent">
                        <span className="add-event-button">Add Event</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle navlink-header-text" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    All Societies
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/society/isa">ISA</a>
                                    <a className="dropdown-item" href="/society/ieee">IEEE</a>
                                    <a className="dropdown-item" href="/society/iste">ISTE</a>
                                    <a className="dropdown-item" href="/society/csi">CSI</a>
                                </div>
                            </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li id="login-li" className="nav-item d-flex align-items-center">
                                        <a className="nav-link btn btn-md btn-primary my-login-button" href="/login">Login</a>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <a className="nav-link btn btn-md btn-primary my-login-button" href="/signup">Sign Up</a>
                                </li>
                            </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;