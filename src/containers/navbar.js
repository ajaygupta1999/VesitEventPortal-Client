import React, { Component } from 'react';
import { NavLink , Link } from "react-router-dom";
import { connect } from "react-redux";
import '../asserts/css/navbar.scss';

class Navbar extends Component {
    render(){
           const { currentUser } = this.props;
           const userid = this.props.currentUser.user.id;
           const cssclass = {
               backgroundColor : "#d8d8d8a6",
               fontWeight : "600"
           }
         
        return(
            <div className="my-content">
                <nav id="my-navbar" className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to="/home" activeStyle={cssclass}>
                        <img style={{ width : '50px', height : '50px' }} id="VES_logo" src="/images/VES_logo.png" alt="profile"/>
                        <span id="vesit-logo">VESIT EVENT</span>
                    </NavLink>
                    <NavLink to={ "/user/" + userid + "/add/eventdetails" } activeStyle={ cssclass }>
                        <span className="add-event-button">Add Event</span>
                    </NavLink>
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
                                    <div className="dropdown-item" style={{ textAlign : "center" , padding : "5px" }}>
                                        <Link to="/society/isa">
                                            <span style={{ fontWeight : "600" , fontSize : "18px" }}>ISA</span>
                                        </Link>
                                    </div>
                                    <div className="dropdown-item" style={{ textAlign : "center" , padding : "5px" }}>
                                        <Link to="/society/isa">
                                            <span style={{ fontWeight : "600" , fontSize : "18px" }}>IEEE</span>
                                        </Link>
                                    </div>
                                    <div className="dropdown-item" style={{ textAlign : "center" , padding : "5px" }}>
                                        <Link to="/society/isa">
                                            <span style={{ fontWeight : "600" , fontSize : "18px" }}>ISTE</span>
                                        </Link>
                                    </div>
                                    <div className="dropdown-item" style={{ textAlign : "center" , padding : "5px" }}>
                                        <Link to="/society/isa">
                                            <span style={{ fontWeight : "600" , fontSize : "18px" }}>CSI</span>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            </ul>
                            {
                                    currentUser.isAuthenticated && (
                                        <ul className="navbar-nav ml-auto">
                                            <li id="login-li" className="nav-item d-flex align-items-center">
                                                <div className="d-flex justify-content-center align-items-center">
                                                   <img style={{ width : "40px", height: "40px", borderRadius : "20px" }} src={ currentUser.user.imgurl ? currentUser.user.imgurl.dataurl : "/images/profile_image.png" } alt="google-logo" /> 
                                                   <p style={{ margin : "0px" , marginLeft : "5px" }}>{ currentUser.user.username }</p>
                                                </div>
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

export default connect(mapStateToProps , null)(Navbar);
