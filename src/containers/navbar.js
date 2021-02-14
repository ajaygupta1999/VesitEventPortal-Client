import React, { Component } from 'react';
import { NavLink , Link, Redirect  } from "react-router-dom";
import { connect } from "react-redux";
import '../asserts/css/navbar.scss';
import { GoogleLogin } from "react-google-login";
import { loginOrSignUp , logout } from "../stores/actions/auth";
import { withRouter } from "react-router-dom";

class Navbar extends Component {

    onSuccessLogin = async (res) => {
        try{
            const userdata = { 
                tokenId : res.tokenId 
            }
            let user = await this.props.loginOrSignUp(userdata);
            if(user.societydetails){
                console.log("Logged in");
                if(!user.societydetails.role){
                    this.props.history.push(`/user/${user._id}/create/classandsociety`);
                }
            }else{
                this.props.history.push(`/user/${user._id}/create/classandsociety`);
            }
        }catch(err){
            return;
        }
    } 
    
    // componentDidMount = () => {
    //     if(this.props.currentUser.isAuthenticated){
    //         if(!this.props.currentUser.user.societydetails){
    //             this.props.history.push(`/user/${this.props.currentUser.user._id}/create/classandsociety`);
    //         }else{
    //             if(!this.props.currentUser.user.societydetails.role){
    //                 this.props.history.push(`/user/${this.props.currentUser.user._id}/create/classandsociety`);
    //             }
    //         }
    //     }
    // }

    // componentDidUpdate = (prevProps , prevState) => {
    //     if(this.props.currentUser.isAuthenticated){
    //         if(!this.props.currentUser.user.societydetails){
    //             this.props.history.push(`/user/${this.props.currentUser.user._id}/create/classandsociety`);
    //         }else{
    //             if(this.props.currentUser.user.societydetails.role){
    //                 this.props.history.push(`/user/${this.props.currentUser.user._id}/create/classandsociety`);
    //             }
    //         }
    //     }
    // }
    

    onFailureLogin = (err) => {
       console.log(err);
    }

    handleLogout = () => {
        this.props.logout();
        this.props.history.push("/home");
        this.props.history.go(0);
    }

    
    render(){
           const { currentUser } = this.props;
        
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
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item navlink-all-lis d-flex justify-content-center align-items-center">
                                    <NavLink to="/home" className="navbar-navsession-links" activeClassName="navbar-active-state">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item navlink-all-lis d-flex justify-content-center align-items-center">
                                    <NavLink to="/home/allevents" className="navbar-navsession-links" activeClassName="navbar-active-state">
                                        All Events
                                    </NavLink>
                                </li>
                                {
                                    this.props.currentUser.isAuthenticated ? (
                                        <li className="nav-item navlink-all-lis d-flex justify-content-center align-items-center">
                                            <NavLink to={ `/user/${ this.props.currentUser.user._id }/add/eventdetails` } className="navbar-navsession-links" activeClassName="navbar-active-state">
                                                Add Event
                                            </NavLink>
                                        </li>
                                    ) : null
                                }
                            
                                <li className="nav-item dropdown" id="navbar-allsocities-dropdown">
                                    <a className="nav-link dropdown-toggle navlink-header-text" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All Societies
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <div className="dropdown-item">
                                            <Link className="navbar-each-society" to="/society/isa" > ISA Vesit </Link>
                                        </div>
                                        <div className="dropdown-item">
                                            <Link className="navbar-each-society" to="/society/ieee"> IEEE Vesit </Link>
                                        </div>
                                        <div className="dropdown-item">
                                            <Link className="navbar-each-society" to="/society/iste"> ISTE Vesit </Link>
                                        </div>
                                        <div className="dropdown-item">
                                            <Link className="navbar-each-society" to="/society/csi"> CSI Vesit </Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            
                            {
                            currentUser.isAuthenticated ? (
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item dropdown navbar-profile-session" id="navbar-allsocities-dropdown">
                                            <a className="nav-link dropdown-toggle navlink-header-text profile-session-link d-flex justify-content-center align-items-center" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img src={ Object.keys(currentUser.user.imgurl).length > 0 ? currentUser.user.imgurl.dataurl : "/images/profile_image.png" } alt="google-logo" /> 
                                                <p>{ currentUser.user.username }</p>
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <div className="profile-image-dropdown-content">
                                                    <div className="dropdown-item">
                                                        <Link to={ `/user/${currentUser.user._id}/profile` }>
                                                            <div className="profile-name-and-email">
                                                                <img src={ Object.keys(currentUser.user.imgurl).length > 0 ? currentUser.user.imgurl.dataurl : "/images/profile_image.png" } alt="profile-image" />
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
                                                    {
                                                    ( this.props.currentUser.user.societydetails && Object.keys(this.props.currentUser.user.societydetails).length > 0 )  && (
                                                            <div>
                                                                <div className="dropdown-item">
                                                                    <Link to={ `/society/${ this.props.currentUser.user.societydetails.name}` } className="Navbar-profile-dopdown-socities-session">
                                                                        <p>{ this.props.currentUser.user.societydetails.name.toUpperCase() } VESIT</p>
                                                                    </Link>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (this.props.currentUser.isAuthenticated && this.props.currentUser.user) && (
                                                            <div>
                                                                <div className="dropdown-item">
                                                                    <Link to={ `/user/${this.props.currentUser.user._id}/profile` } className="Navbar-profile-dopdown-profile-session">
                                                                        <p>Go to Profile</p>
                                                                    </Link>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        )

                                                    }
                                                    
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
                                        <li className="nav-item navlink-all-lis navbar-login-and-sign-button d-flex justify-content-center align-items-center">
                                            <button className="btn btn-md btn-light login-and-signup-buttons">
                                                <GoogleLogin
                                                        clientId={ process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID }
                                                        buttonText="Login"
                                                        onSuccess={this.onSuccessLogin}
                                                        onFailure={this.onFailureLogin}
                                                        cookiePolicy={'single_host_origin'}
                                                />
                                            </button>
                                            
                                        </li>
                                        <li className="nav-item navlink-all-lis navbar-login-and-sign-button d-flex justify-content-center align-items-center">
                                            <button className="btn btn-md btn-light login-and-signup-buttons">
                                                <GoogleLogin
                                                        clientId={ process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID }
                                                        buttonText="Sign Up"
                                                        onSuccess={this.onSuccessLogin}
                                                        onFailure={this.onFailureLogin}
                                                        cookiePolicy={'single_host_origin'}
                                                />
                                            </button>
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

export default withRouter(connect(mapStateToProps , {loginOrSignUp , logout })(Navbar));
