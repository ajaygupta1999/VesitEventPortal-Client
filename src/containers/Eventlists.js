import React, { Component } from 'react';
import Event from "./Event";
import { fetchAllEvents } from "../stores/actions/event";
import { connect } from "react-redux";
import "../asserts/css/EventCards.css";


class Eventlists extends Component{

    constructor(props){
        super(props);
        this.state = {
            events : [1 , 2]
        }
    }

    componentDidMount = async () => {
       this.props.fetchAllEvents();
    }

    render(){
        const { allEvents } = this.props;

        return(
            <div>
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="my-ongoing-title-index-page">Today's Events</h4>
                </div>
                <div className="MY-on-going-evenets-session">
                    <div className="row">
                        {
                            allEvents.map(event => {
                                return <Event key={event.id} {...event}/>
                            }) 
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        allEvents : state.allEvents
    }
}


export default connect( mapStateToProps , { fetchAllEvents } )(Eventlists);