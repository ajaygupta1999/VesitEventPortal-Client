import React, { Component } from 'react';
import { connect } from "react-redux";
import RegisteredEvents from "./RegisteredEvents";
import { Link , withRouter } from "react-router-dom";
import { parse } from "query-string";

class UserpageContent extends Component{


    render(){
        const { location : { search } } = this.props;
        let queryObj = parse(search);  

        return(
            <div className="society-page-navigation-session">
                 <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <Link className={ `nav-link ${(queryObj.show === "registered-events" || Object.keys(queryObj).length === 0) ? "active" : null}` } id="pills-home-tab" data-toggle="pill" role="tab" aria-selected="true">
                            Registerd Events
                        </Link>
                    </li>
                </ul>
                {
                   ( queryObj.show === "registered-events" || Object.keys(queryObj).length === 0 ) && 
                    <RegisteredEvents />
                

                }
            </div>
            

        )
    }
}


export default  withRouter(UserpageContent);