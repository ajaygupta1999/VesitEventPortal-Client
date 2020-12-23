import React, { Component } from 'react';
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { authUser , logout } from "../stores/actions/auth";
import { withRouter } from "react-router-dom";

class Googlelogin extends Component{
    
    onSuccessLogin = (res) => {
        const userdata = { 
            tokenId : res.tokenId 
        }
        this.props.authUser(userdata)
        .then((user) => {
            console.log("From Googlelogin  component" , user);
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
       return(
           <div>
               <h5>Login With Google</h5>
               <GoogleLogin
                    clientId="878476685235-rubcpt9de8uo2g1ing0iqnanfkmpb4h5.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={this.onSuccessLogin}
                    onFailure={this.onFailureLogin}
                    cookiePolicy={'single_host_origin'}
               />
               <button className="btn btn-md btn-danger" onClick={this.handleLogout}>Logout</button> 
           </div>
       )
   }
}


export default withRouter( connect(null , { authUser , logout })(Googlelogin) );
