import React, { Component } from 'react';
import SocietyHeader from "./SocietyHeader";
import SocietyContents from "./SocietyContents";
import Navbar from "../navbar";
import "../../asserts/css/Society.scss"; 
import { loadSocietyData , fetchSocietyMembersFullDetails } from "../../stores/actions/society"; 
import { connect } from "react-redux";
import SearchModal from '../model/SearchModal';
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css'; 


class SocietyPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFetchingSocietyData : false,
            isFetchingMembersData : false,
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                ...this.state,
                isFetchingSocietyData : true,
                isFetchingMembersData  :true
            });
            let societyname = this.props.match.params.name;
            let { society } = await this.props.loadSocietyData(societyname);
            this.setState({
                ...this.state,
                isFetchingSocietyData : false
            });
            if(society){
                await this.props.fetchSocietyMembersFullDetails(society._id);
                this.setState({
                    ...this.state,
                    isFetchingMembersData : false
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if(prevProps.match.params.name !== this.props.match.params.name){
            this.setState({
                ...this.state,
                isFetchingSocietyData: true,
            });
            let societyname = this.props.match.params.name;
            let { society } = await this.props.loadSocietyData(societyname);
            this.setState({
                ...this.state,
                isFetchingSocietyData : false
            });
            if(society){
                await this.props.fetchSocietyMembersFullDetails(society._id);
            }
        }    
    }

    render(){
        return (
            <div>
                <Navbar />
                {
                    this.state.isFetchingSocietyData &&
                        <div className="spinner-div text-center">
                            <Spinner className="custom-modal-spinner" animation="border"/>
                        </div>
                }
                {
                    !this.state.isFetchingSocietyData &&
                        <div>
                            <SocietyHeader data={ this.props.society.data } />
                            <SocietyContents />
                            {
                                this.props.society.isSearchModelVisible &&
                                  <SearchModal society={this.props.society} isFetching={this.state.isFetchingMembersData} />
                            }
                        </div>
                }
            </div>
        )
    }


}

const mapStatesToProps = (state) => ({
   society : state.society
})


export default connect( mapStatesToProps , { loadSocietyData , fetchSocietyMembersFullDetails } )(SocietyPage);