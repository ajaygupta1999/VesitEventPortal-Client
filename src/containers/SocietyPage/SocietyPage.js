import React, { Component } from 'react';
import SocietyHeader from "./SocietyHeader";
import SocietyContents from "./SocietyContents";
import Navbar from "../navbar";
import "../../asserts/css/Society.scss"; 
import { loadSocietyData , fetchSocietyMembersFullDetails } from "../../stores/actions/society"; 
import { connect } from "react-redux";
import SearchModal from '../model/SearchModal';



class SocietyPage extends Component {

    componentDidMount = async () => {
        try {
            let societyname = this.props.match.params.name;
            let { society } = await this.props.loadSocietyData(societyname);
            if(society){
               await this.props.fetchSocietyMembersFullDetails(society._id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(prevProps.match.params.name !== this.props.match.params.name){
            let societyname = this.props.match.params.name;
            this.props.loadSocietyData(societyname);   
        }    
    }

    render(){
        return (
            <div>
                <Navbar />
                <SocietyHeader data={ this.props.society.data } />
                <SocietyContents />
                {
                    this.props.society.isSearchModelVisible &&
                    <SearchModal />
                }
            </div>
        )
    }


}

const mapStatesToProps = (state) => ({
   society : state.society
})


export default connect( mapStatesToProps , { loadSocietyData , fetchSocietyMembersFullDetails } )(SocietyPage);