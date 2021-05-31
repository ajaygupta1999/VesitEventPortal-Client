import React, { Component } from 'react';
import "../../asserts/css/Forms.scss";
import Navbar from "../navbar";
import "../../asserts/css/EventForm.scss";



class EventForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            formdata : [],
           
        }
    }

    handleChange = (e) => {

        
    }
   

    render(){
    
        return(
            <div className="form-genetaor-page">
                <Navbar />
                <div className="form-genrator-background">
                    <div className="form-session-of-form-generator">
                        <h1 className="form-generator-text">Form Generator</h1>
                        <div className="form-title">
                            <div className="edit-button-of-form-title">
                                <button type="button" className="btn btn-sm btn-primary">
                                    <i class="fas fa-pen"></i>
                                </button>
                            </div>
                            <div className="input-form-title-div">
                              <input className="input-form-title" type="text" name="titlecolortoggle"/>
                            </div>
                        </div>
                        <div className="main-form-content row">
                            <div className="col-md-4 form-page-svg-img-session">
                            </div>
                            <div className="col-md-8 my-3 main-form-content-div">
                                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                    <div className="description-about-form d-flex justify-content-start">
                                        <div className="alert-icon-div mr-3 pr-4 d-flex align-items-center alert-font-awesome-div">
                                            <i class="fas fa-question-circle"></i>
                                        </div>
                                        <div className="rules-div">
                                            <p>Here you can create dynamic forms and you can customize that form. We have lot of tools to fullfil your needs.
                                                to get started please click the button below.
                                            </p>
                                        </div>
                                    </div>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <button type="button" className="btn btn-md btn-primary add-feild-button">
                                    <i class="fas fa-plus"></i> <span>Add Fields</span>
                                </button>
                            </div>
                        </div>
                        <div className="feild-selector">
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div className="each-feild-text">
                                    Name field
                                </div>
                            </div>
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                   <i class="fas fa-envelope"></i>
                                </div>
                                <div className="each-feild-text">
                                    Email field
                                </div>
                            </div>
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                   <i class="fas fa-sort-numeric-up-alt"></i>
                                </div>
                                <div className="each-feild-text">
                                    Roll No.
                                </div>
                            </div>
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                    <i class="fas fa-graduation-cap"></i>
                                </div>
                                <div className="each-feild-text">
                                    Class
                                </div>
                            </div>
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                <i class="fas fa-graduation-cap"></i>
                                </div>
                                <div className="each-feild-text">
                                    Department
                                </div>
                            </div>
                            <hr />
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                   
                                </div>
                                <div className="each-feild-text">
                                   short Answer
                                </div>
                            </div>
                            <div className="short-fields">
                                <div className="each-feild-icon">
                                   <i class="fas fa-sort-numeric-up-alt"></i>
                                </div>
                                <div className="each-feild-text">
                                    Roll No.
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}


export default EventForm;