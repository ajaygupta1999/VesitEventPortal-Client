import React, { Component } from 'react';
import "../../asserts/css/Forms.scss";
import { Link } from "react-router-dom";
import { setEventDetails } from "../../stores/actions/userRegisterDetails";
import { connect } from 'react-redux';
import Navbar from "../navbar";
import { Editor } from '@tinymce/tinymce-react';


class EventDetailsForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             eventname : "",
             shortdesc : "",
             fulldesc : "",
             category : "technical",
             image : {},
             date : "",
             time  : "",
         }
     }
     
     componentDidMount(){
         let date = new Date();
         let todaysdate =  date.getFullYear() + "-" + ( date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1 )): (date.getMonth() + 1) ) + "-" +  ( date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
         var time = (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());
         this.setState({
             ...this.state,
             date : todaysdate,
             time : time
         });
     }

     handleChange = (e) => {
         this.setState({
             [e.target.name] : e.target.value
         });
     }

     handleFileChange = (e) => {
        this.setState({
            ...this.state,
            image : e.target.files[0]
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { userid } = this.props.match.params;
        if(this.props.currentUser.isAuthenticated){
            this.props.setEventDetails(this.state , userid)
            .then(() => {
                this.props.history.push(`/user/${this.props.currentUser.user._id}/add/${this.props.createdEvent.data._id}/guestandsponsor`);    
            }).catch(() => {
                return;
            });
        }
    }

    handleEditorChange = (content, editor) => {
        
        this.setState({
            ...this.state,
            fulldesc : content
        });
      }

    render(){
        return(
            <div>
                <Navbar />
                <div className="our-login-page-content">
                 <div className="event-page-navigation">
                    <div className="society-page-navigation-session d-flex flex-row justify-content-center"> 
                        <div class="event-details-session current-event-details-filling">
                            <span>Event Details</span>
                        </div>
                        <div class="event-details-session">
                            <span>Guest and Sponsors</span>
                        </div>
                        <div class="event-details-session">
                            <span>Registration form</span>
                        </div>                        
                    </div>
                </div>
                 </div>
			     <div id="login-container">
                    <div className="login-page-contant">
                        <center><h1 className="new-h1">Add New Event</h1></center>
                        <form className="submit-forms" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <div className="guest-details-session row">
                                <div className="col-md-4 description-about-each-form">
                                    <h5>Event Details</h5>
                                    <p>Here please fill the event details, like for Name of event and some more details.
                                        you can create dynamic description for your event. it will be visible on the event page.
                                    </p>
                                </div>
                                <div className="col-md-8">
                                <div className="row">
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="username" className="label">Event Name</label>
                                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Event Name"
                                                name="eventname" value={this.state.eventname} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="exampleFormControlSelect1" className="label">Event Category</label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="category" value={this.state.category} onChange={this.handleChange}>
                                            <option value="technical">Technical Event</option>
                                            <option value="non-technical">Non-technical Event</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1" className="label">Event-Short Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name="shortdesc" placeholder="Short description about Event" value={this.state.shortdesc} onChange={this.handleChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea2" className="label">Event-Full Description</label>
                                    <Editor
                                        apiKey={ process.env.REACT_APP_EDITOR_API_KEY }
                                        initialValue="<p>Write Full details of the event here.</p>"
                                        init={{
                                            /* replace textarea having class .tinymce with tinymce editor */
                                            selector: "textarea.tinymce",
                                            /* width and height of the editor */
                                            width: "100%",
                                            height: 600,	
                                            /* display statusbar */
                                            statubar: true,	
                                            /* plugin */
                                            plugins: [
                                                "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                                                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                                                "save table contextmenu directionality emoticons template paste textcolor"
                                            ],
                                            /* toolbar */
                                            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
                                            /* style */
                                            style_formats: [
                                                {title: "Headers", items: [
                                                    {title: "Header 1", format: "h1"},
                                                    {title: "Header 2", format: "h2"},
                                                    {title: "Header 3", format: "h3"},
                                                    {title: "Header 4", format: "h4"},
                                                    {title: "Header 5", format: "h5"},
                                                    {title: "Header 6", format: "h6"}
                                                ]},
                                                {title: "Inline", items: [
                                                    {title: "Bold", icon: "bold", format: "bold"},
                                                    {title: "Italic", icon: "italic", format: "italic"},
                                                    {title: "Underline", icon: "underline", format: "underline"},
                                                    {title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
                                                    {title: "Superscript", icon: "superscript", format: "superscript"},
                                                    {title: "Subscript", icon: "subscript", format: "subscript"},
                                                    {title: "Code", icon: "code", format: "code"}
                                                ]},
                                                {title: "Blocks", items: [
                                                    {title: "Paragraph", format: "p"},
                                                    {title: "Blockquote", format: "blockquote"},
                                                    {title: "Div", format: "div"},
                                                    {title: "Pre", format: "pre"}
                                                ]},
                                                {title: "Alignment", items: [
                                                    {title: "Left", icon: "alignleft", format: "alignleft"},
                                                    {title: "Center", icon: "aligncenter", format: "aligncenter"},
                                                    {title: "Right", icon: "alignright", format: "alignright"},
                                                    {title: "Justify", icon: "alignjustify", format: "alignjustify"}
                                                ]}
                                            ]
                                        }}
                                        onEditorChange={this.handleEditorChange}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="eventimagefield"  className="label">Event Image</label>
                                    <input type="file" className="form-control" id="eventimagefield" aria-describedby="emailHelp" accept="image/*" name="image" onChange={this.handleFileChange}/>
                                </div>
                                <div className="row">
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="eventdate" className="label">Event Date</label>
                                        <input type="Date" id="eventdate" className="form-control" aria-describedby="emailHelp" 
                                            name="date" value={this.state.date} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="eventtime" className="label">Event Timining</label>
                                        <input type="time" className="form-control" id="eventtime" aria-describedby="emailHelp" 
                                            name="time" value={this.state.time} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between" id="forgotpassword">
                                    <div>
                                        <a id="our-back-button" className="btn btn-md btn-light back-buttons" href="/">Back</a>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Next</button>
                                    </div>
                                </div>
                            </div>
					        </div>
                    </form>
				</div>
			</div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser : state.currentUser,
        createdEvent : state.createdEvent
    }
} 

export default connect(mapStateToProps , {  setEventDetails })(EventDetailsForm);
