import React, { Component } from 'react';
import "../../asserts/css/SponsorCard.scss";


class SponsorCard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            viewAll : false
        }
    }

    handleViewAllClick = () => {
        this.setState({
            viewAll : !this.state.viewAll
        })
    }

    render(){
        let sponsor = this.props.data;
        return (
            <div className="each-sponsors-card">
                <div className="full-detail-session container">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <p className="sponsors-name">{ sponsor.name }</p>
                            {
                                (sponsor.description.length > 150 ) ? (
                                    <div>
                                        {
                                            this.state.viewAll ?  (
                                                <p className="sponsors-description">
                                                    {sponsor.description} 
                                                    <span style={{ color : "blue", textDecoration : "underline" }} onClick={this.handleViewAllClick}>... Show less</span> 
                                                </p>
                                            ) : (
                                                <p className="sponsors-description">
                                                    {sponsor.description.substring(0 , 150)} 
                                                    <span style={{ color : "blue" ,  textDecoration : "underline" }} onClick={this.handleViewAllClick}>... Read more</span> 
                                                </p>
                                            )       
                                        }
                                        </div>
                                ) : (
                                    <p className="sponsors-description">
                                        {sponsor.description}  
                                    </p>
                                )
                            }
                            
                        </div>
                        <div className="col-12 col-md-4 d-flex align-items-center">
                            <div className="full-detail-img-session d-flex justify-content-center">
                                <img className="sponsors-image"  
                                  src={ sponsor.imgurl ? sponsor.imgurl.dataurl : "/images/github.png" } alt="sponsors-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}


export default SponsorCard;