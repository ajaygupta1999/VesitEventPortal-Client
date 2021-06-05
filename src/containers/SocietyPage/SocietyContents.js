import React, { Component } from 'react';
import AboutSociety from "./AboutSociety";
import AboutMembers from "./AboutMembers";
import Events from "./Events";
import EventStatistics from "./EventStatistics";
import { Link , withRouter } from "react-router-dom";
import { parse } from "query-string";
import { connect } from "react-redux";

class SocietyContents extends Component{
    
    render(){
        const { location : { search } } = this.props;
        let queryObj = parse(search);  
        
        return(
            <div className="society-page-navigation-session">
                 <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-society` } className={ `nav-link ${(queryObj.show === "about-society" || Object.keys(queryObj).length === 0) ? "active" : null}` } id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">
                            About Society</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=about-members` } className={ `nav-link ${(queryObj.show === "about-members") ? "active" : null}` } id="pills-profile-tab" data-toggle="pill" role="tab"  aria-selected="false">About Members</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=events` } className={ `nav-link ${(queryObj.show === "events") ? "active" : null}` } id="pills-contact-tab" data-toggle="pill" role="tab" aria-selected="false">Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }?show=eventevent-statistics` } className={ `nav-link ${(queryObj.show === "eventevent-statistics") ? "active" : null}` } id="pills-contact-tab" data-toggle="pill" role="tab" aria-selected="false">Event Statistics</Link>
                    </li>
                </ul>
                {
                   ( queryObj.show === "about-society" || Object.keys(queryObj).length === 0 ) && 
                       <AboutSociety />

                }
                {
                    queryObj.show === "about-members" &&
                       <AboutMembers />

                }
                {
                    queryObj.show === "events" && 
                       <Events />
                }
                {
                    queryObj.show === "eventevent-statistics" &&
                       <EventStatistics />
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        society : state.society
    }
}


export default withRouter(connect(mapStateToProps , null )(SocietyContents));