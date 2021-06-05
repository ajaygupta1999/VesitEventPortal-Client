import React, { Component } from 'react';
import { Link , withRouter } from "react-router-dom";
import { parse } from "query-string";
import { connect } from "react-redux";


class AboutMembers extends Component {
    
    render() {
            const { location : { search } } = this.props;
            const normal_members = this.props.society.normal_members;
            const council_members = this.props.society.council_members;
            const council_heads = this.props.society.council_heads;
            const faculty =  this.props.society.faculty;
            let queryObj = parse(search);  

            let filtereData = [];
            if(Object.keys(this.props.society.data).length > 0){
                    if(Object.keys(queryObj).length === 1){
                        // Default council head
                        console.log("Default");
                        filtereData = council_heads;
                    }else{
                        if(queryObj.memberType === "council-heads"){
                            filtereData = council_heads;
                        }
                        if(queryObj.memberType === "council-members"){
                            filtereData = council_members;
                        }
                        if(queryObj.memberType === "normal-members"){
                            filtereData =  normal_members;
                        }
                        if(queryObj.memberType === "faculty"){
                            if(this.props.society.faculty){
                                filtereData.push(faculty); 
                            }
                        }
                    }
            }

            console.log("Filtered data , " , filtereData);
           
                
        return(
            <div className="about-members-session container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-2 our-navigation-of-members">
                        <div className="all-members-nev-buttons-div nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-members&memberType=council-heads` } 
                                className={ `nav-link ${(queryObj.memberType === "council-heads" || Object.keys(queryObj).length === 1) ? "active" : null} members-navigation-buttons` } 
                                id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">Coucil-heads</Link>
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-members&memberType=council-members` } 
                                className={ `nav-link ${(queryObj.memberType === "council-members") ? "active" : null} members-navigation-buttons` } 
                                id="v-pills-profile-tab" data-toggle="pill"  role="tab" aria-controls="v-pills-profile" aria-selected="false">Council-members</Link>
                            <Link to={`/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-members&memberType=normal-members` } 
                                className={ `nav-link ${(queryObj.memberType === "normal-members") ? "active" : null} members-navigation-buttons` } 
                                id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Normal Members</Link>
                            <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-members&memberType=faculty` } 
                                className={ `nav-link ${(queryObj.memberType === "faculty") ? "active" : null} members-navigation-buttons` } 
                                id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">Faculty</Link>
                        </div>
                    </div>
                    <div className="all-membes-cards col-12 col-md-9 col-lg-10">
                        <div className="row">
                            {
                                filtereData.map(member => (
                                    member.username ? (
                                        <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                            <div className="card">
                                                <img className="card-img-top" src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="Card image cap" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{ member.username }</h5>
                                                    {
                                                        member.societydetails && 
                                                         <p className="card-text">{ member.societydetails.role.toUpperCase() }, { member.societydetails.specificrole ? member.societydetails.specificrole : null }</p>
                                                    }
                                                    {
                                                        member.classdetails && 
                                                         <p className="card-text">{ member.classdetails.department.toUpperCase() }, {member.classdetails.class.toUpperCase()}-{ member.classdetails.rollno } </p>

                                                    }
                                                    <button className="btn btn-sm btn-primary"> Profile </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="each-member-card col-12 col-md-6 col-lg-4 col-xl-3">
                                            <div className="card">
                                                <img className="card-img-top" src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="Card image cap" />
                                                <div className="card-body">
                                                    <h4 className="text-center"> {member.name} </h4>
                                                    <p className="card-text second-card-text text-center">{ queryObj.memberType ? queryObj.memberType.toUpperCase() : null }</p>
                                                    <p className="card-text second-card-text text-center"><i class="far fa-envelope"></i> { member.email }</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ) 
                                ))
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    society : state.society,
}) 

export default withRouter(connect(mapStateToProps , null)(AboutMembers));