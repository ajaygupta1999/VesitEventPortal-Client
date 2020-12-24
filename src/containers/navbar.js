import React, { Component } from 'react';
import { NavLink , Link } from "react-router-dom";
import { connect } from "react-redux";
import '../asserts/css/navbar.scss';
import { GoogleLogin } from "react-google-login";
import { authUser , logout } from "../stores/actions/auth";
import { withRouter } from "react-router-dom";

console.log(authUser);


class Navbar extends Component {
    
    onSuccessLogin = (res) => {
        const userdata = { 
            tokenId : res.tokenId 
        }
        this.props.authUser(userdata)
        .then((user) => {
            if(user.firstname && user.lastname && user.societydetails.role){
                this.props.history.push("/");
            }else{
                this.props.history.push(`/user/${user.id}/create/personaldetails`);
            }
        }).catch(() => {
            return;
        });
    }

    onFailureLogin = (err) => {
       console.log(err);
    }

    handleLogout = () => {
        this.props.logout();
    }


    render(){
           console.log(this.props.authUser);
           const { currentUser } = this.props;
           const userid = this.props.currentUser.user.id;
         
        return(
            <div className="my-content">
                <nav id="my-navbar" className="navbar navbar-expand-lg navbar-light">
                    <NavLink to="/home" className="navbar-navsession-links" id="navbar-logo-link">
                        <img src="/images/VES_logo.png" alt="profile"/>
                       VESIT EVENT
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item navlink-all-lis d-flex justify-content-center align-items-center">
                                <NavLink to="/home" className="navbar-navsession-links" activeClassName="navbar-active-state">
                                    Home
                                </NavLink>
                            </li>
                            <li class="nav-item navlink-all-lis d-flex justify-content-center align-items-center">
                                <NavLink to="/home/allevents" className="navbar-navsession-links" activeClassName="navbar-active-state">
                                    All Events
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown" id="navbar-allsocities-dropdown">
                                <a className="nav-link dropdown-toggle navlink-header-text" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    All Societies
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="dropdown-item">
                                        <Link className="navbar-each-society" to="/society/isa" > ISA </Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link className="navbar-each-society" to="/society/isa"> IEEE </Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link className="navbar-each-society" to="/society/isa"> ISTE </Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link className="navbar-each-society" to="/society/isa"> CSI </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                           
                        {
                           currentUser.isAuthenticated ? (
                                <ul className="navbar-nav ml-auto">
                                     <li className="nav-item dropdown navbar-profile-session" id="navbar-allsocities-dropdown">
                                        <a className="nav-link dropdown-toggle navlink-header-text profile-session-link d-flex justify-content-center align-items-center" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src={ currentUser.user.imgurl ? currentUser.user.imgurl.dataurl : "/images/profile_image.png" } alt="google-logo" /> 
                                            <p>{ currentUser.user.username }</p>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <div className="profile-image-dropdown-content">
                                                <div className="dropdown-item">
                                                    <Link to="/notification">
                                                        <div className="profile-name-and-email">
                                                            <img src={ currentUser.user.imgurl ? currentUser.user.imgurl.dataurl : "/images/profile_image.png" } alt="profile-image" />
                                                            <p className="nav-profile-user-name">{ currentUser.user.username }</p>
                                                            <p className="nav-profile-user-email">{ currentUser.user.email }</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <hr />
                                                <div className="dropdown-item">
                                                    <div className="Navbar-notifications-session">
                                                        <p>Notifications</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="dropdown-item">
                                                    <div className="Navbar-profile-dopdown-socities-session">
                                                        <p>Socity</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="dropdown-item">
                                                    <div className="Navbar-profile-dopdown-profile-session">
                                                        <p>Go to Profile</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="dropdown-item">
                                                    <div className="Navbar-profile-dopdown-profile-session">
                                                        <p onClick={this.handleLogout}>Logout</p>
                                                    </div>
                                                </div>
                                            </div>        
                                        </div>
                                    </li>
                                </ul>
                             )   : (
                                <ul className="navbar-nav ml-auto">
                                    <li class="nav-item navlink-all-lis navbar-login-and-sign-button d-flex justify-content-center align-items-center">
                                        <GoogleLogin
                                                clientId="878476685235-rubcpt9de8uo2g1ing0iqnanfkmpb4h5.apps.googleusercontent.com"
                                                buttonText="Login"
                                                onSuccess={this.onSuccessLogin}
                                                onFailure={this.onFailureLogin}
                                                cookiePolicy={'single_host_origin'}
                                        />
                                    </li>
                                    <li class="nav-item navlink-all-lis navbar-login-and-sign-button d-flex justify-content-center align-items-center">
                                        <GoogleLogin
                                                clientId="878476685235-rubcpt9de8uo2g1ing0iqnanfkmpb4h5.apps.googleusercontent.com"
                                                buttonText="Sign Up"
                                                onSuccess={this.onSuccessLogin}
                                                onFailure={this.onFailureLogin}
                                                cookiePolicy={'single_host_origin'}
                                        />
                                    </li>
                                </ul>

                             )
                        }
                    </div>
                </nav>
            </div>
        )
    }
}



function mapStateToProps (state){
   return {
       currentUser : state.currentUser
   };
}

export default withRouter(connect(mapStateToProps , {authUser , logout})(Navbar));
