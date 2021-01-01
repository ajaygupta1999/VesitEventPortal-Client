import React, { Component } from 'react';
import Navbar from "../navbar";
import UserPageContent from "./UserPageContent";
import UserPageHeader from "./UserPageHeader";
import { connect } from "react-redux";
import "../../asserts/css/Society.scss";


class UserPage extends Component{

    
    render(){
        let totalReg = this.props.registeredEvents.length;

        return(
            <div>
                <Navbar />
                <UserPageHeader data={ this.props.user } totalreg={totalReg}/>
                <UserPageContent />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user : state.currentUser,
    registeredEvents : state.registeredEvents.data
});

export default connect(mapStateToProps , null)(UserPage);