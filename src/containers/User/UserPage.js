import React, { Component } from 'react';
import Navbar from "../navbar";
import UserPageContent from "./UserPageContent";
import UserPageHeader from "./UserPageHeader";
import { connect } from "react-redux";
import "../../asserts/css/Society.scss";
import {  withRouter } from "react-router-dom";
import  { fetchSpecificUser } from "../../stores/actions/user";


class UserPage extends Component{

    componentWillMount = async () => {
        let { userid } = this.props.match.params;
        await this.props.fetchSpecificUser(userid);
    }

    componentDidUpdate = async (prevProps , prevState) => {
        let prevuserid = prevProps.match.params.userid;
        let newuserid = this.props.match.params.userid;
        if(prevuserid.toString() !==  newuserid.toString()){
            await this.props.fetchSpecificUser(newuserid);
        }
    }


    render(){

        let totalReg = 0;
        if(Object.keys(this.props.specificUser.user).length > 0){
            totalReg = this.props.specificUser.user.registered_events.length;
        }
        
        return(
            <div>
                <Navbar />
                <UserPageHeader user={ this.props.specificUser.user } currentUser={this.props.currentUser} totalreg={totalReg}/>
                <UserPageContent />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    specificUser : state.specificUser
});

export default withRouter(connect(mapStateToProps , { fetchSpecificUser })(UserPage));