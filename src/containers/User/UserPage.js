import React, { Component } from 'react';
import Navbar from "../navbar";
import UserPageContent from "./UserPageContent";
import UserPageHeader from "./UserPageHeader";
import { connect } from "react-redux";
import "../../asserts/css/Society.scss";
import {  withRouter } from "react-router-dom";
import  { fetchSpecificUser } from "../../stores/actions/user";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css'; 




class UserPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            isFetching : false,
        }
    }

    componentDidMount = async () => {
        this.setState({
            ...this.state,
            isFetching : true
        });
        let { userid } = this.props.match.params;
        await this.props.fetchSpecificUser(userid);
        this.setState({
            ...this.state,
            isFetching : false
        });
    }

    componentDidUpdate = async (prevProps , prevState) => {
        let prevuserid = prevProps.match.params.userid;
        let newuserid = this.props.match.params.userid;
        if(prevuserid.toString() !==  newuserid.toString()){
            this.setState({
                ...this.state,
                isFetching : true
            });
            await this.props.fetchSpecificUser(newuserid);
            this.setState({
                ...this.state,
                isFetching : false
            });
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
                {
                    this.state.isFetching &&
                        <div className="spinner-div text-center">
                            <Spinner className="custom-modal-spinner" animation="border"/>
                        </div>
                }
                {
                     !this.state.isFetching &&
                        <div>
                            <UserPageHeader user={ this.props.specificUser.user } currentUser={this.props.currentUser} totalreg={totalReg}/>
                            <UserPageContent />
                        </div>    
                }
                
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    specificUser : state.specificUser
});

export default withRouter(connect(mapStateToProps , { fetchSpecificUser })(UserPage));