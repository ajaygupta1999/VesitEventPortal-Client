import React, { Component } from 'react';
import EventVisualizer from "./EventVisualization/EventVisualizer";
import AllEventVisualizer from "./EventVisualization/AllEventVisualizer";
import "../../asserts/css/DataVisualization.scss";
import { addClassWiseReg , addBranchWiseReg } from "../../utils";



class EventVisualization extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedVisualization  : "all",
            todaysEventsData : [],
            allEventsData : []
        }
    }

    componentDidMount = async () => {
        let { todaysEvents } = this.props;
        let todaysEventsData = [];
        
        // Creating new data formate for data visualization ==
        for(var i = 0 ; i < todaysEvents.length; i++){
            let eventobj = {};
            eventobj.id = todaysEvents[i]._id;
            eventobj.name = todaysEvents[i].name;
            eventobj.totalregistrations = todaysEvents[i].registrations.length;
            eventobj.classWiseReg = todaysEvents[i].classWiseReg;
            eventobj.branchWiseReg = todaysEvents[i].branchWiseReg;
            todaysEventsData.push(eventobj);
        }

        this.setState({
            ...this.state,
            todaysEventsData : todaysEventsData,
            allEventsData : todaysEvents
        });
    }

    handleEventClick = (id) => {
        console.log("Clicked ==>" , id);
        if(id === "all"){
            this.setState({
                ...this.state,
                selectedVisualization : "all"
            });
        }else{
            this.setState({
                ...this.state,
                selectedVisualization : id
            });
        }
    }


    render(){
        let clickedevent;
        if(this.state.selectedVisualization !== "all"){
           clickedevent = this.state.todaysEventsData.filter(event => event.id.toString() === this.state.selectedVisualization.toString());
        }

        console.log("clickedevent ==> " , clickedevent);

        return( 
            <div className="Event-registration-visualization">
                {
                     this.state.allEventsData.length > 0 && 
                      <div>
                            <h2 className="text-center heading">Today's Event Data Visualization</h2>
                            <p className="event-visualization-desc">Here you can visualize all registrations statistics. In All Event section all today's event statistics can be visualized. You can also check event wise registrations.</p>
                            <div className="all-data-section">
                                <h4 className="inside-first-visualization">Today's Event Data</h4>
                                <div className="row">
                                    <div className="col-lg-3 All-buttons-of-events">
                                        <div>
                                            <button className={ this.state.selectedVisualization === "all" ?  "each-event-buttons seleted-event-button mb-2" : "each-event-buttons mb-2" } onClick={() => { 
                                                this.handleEventClick("all")
                                            }}>All Events</button>
                                        </div>
                                        {
                                            this.state.todaysEventsData.map(eachdata => {
                                                return (
                                                    <div>
                                                        <button className={ eachdata.id.toString() === this.state.selectedVisualization.toString() ? "each-event-buttons seleted-event-button mb-2" : "each-event-buttons mb-2" }  onClick={() => { 
                                                            this.handleEventClick(eachdata.id);
                                                        }}> { eachdata.name }</button>
                                                    </div>
                                                )   
                                            }) 
                                        }
                                    </div>
                                    <div className="col-lg-9 pi-charts-data-visualization">
                                        {
                                            this.state.selectedVisualization === "all" ? (
                                                <AllEventVisualizer data={this.state.todaysEventsData}/>
                                            )
                                            : (
                                                <EventVisualizer data={clickedevent[0]} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                      </div>
                }
                
            </div>
        )
    }
}


export default EventVisualization;