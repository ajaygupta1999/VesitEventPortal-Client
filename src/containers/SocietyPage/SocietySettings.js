import React, { Component } from 'react';
import  { connect } from "react-redux"; 
import Navbar from "../navbar";
import { loadSocietyData , fetchSocietyMembersFullDetails  , updateSocietyDetails , updateAboutSocietyDetails , updateSocietyAddChairpersonOrFaculty } from "../../stores/actions/society";
import { fetchAllUsers } from "../../stores/actions/userRegisterDetails";
import { Editor } from '@tinymce/tinymce-react';
import { Link } from "react-router-dom";


class SocietySettings extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            allUsers : [],
            allFaculty : [],
            chairpersonsearch : "",
            facultysearch : "",
            name :  "",
            societyimage : {},
            societybackground : {},
            title : "",
            chairperson : {},
            faculty : {},
            aboutsociety : ""
        }
    }

    componentWillMount = async () => {
        let { users } = await this.getAllUsers();
        let allFaculty = users.filter(user => user.role === "faculty");
        let { societyname , societyid } = this.props.match.params; 
        let { society } = await this.props.loadSocietyData(societyname);
        if(society){
            this.setState({
                ...this.state,
                allUsers : users,
                allFaculty : allFaculty,
                name : this.props.society.data.name,
                title : this.props.society.data.title ? this.props.society.data.title : "",
                aboutsociety : this.props.society.data.aboutsociety ? this.props.society.data.aboutsociety : "",
            });
            // await this.props.fetchSocietyMembersFullDetails(society._id);
        }
    }


    componentDidUpdate = (prevProps , prevState) => {
        if(JSON.stringify(prevProps.society.data) !== JSON.stringify(this.props.society.data)){
            let societydata = this.props.society.data;
            this.setState({
                name : societydata.name,
                societyimage : societydata.societyimage ? societydata.societyimage : null,
                societybackground : societydata.societybackground ? societydata.societybackground : null,
                title : societydata.title ? societydata.title : "",
            });
        } 

        if(JSON.stringify(prevProps.society.data.aboutsociety) !== JSON.stringify(this.props.society.data.aboutsociety)){
              console.log("My contant has been updated" , this.props.society.data.aboutsociety);
              this.setState({
                  aboutsociety : this.props.society.data.aboutsociety
              });
        }

        if(JSON.stringify(prevProps.society.chairperson) !== JSON.stringify(this.props.society.chairperson)){
            this.setState({
                chairperson : this.props.society.chairperson
            });
        }

        if(JSON.stringify(prevProps.society.faculty) !== JSON.stringify(this.props.society.faculty)){
            this.setState({
                faculty : this.props.society.faculty
            });
        }

        
    }



    getAllUsers = async () => {
        let { allusers }  = await this.props.fetchAllUsers(this.props.currentUser.user._id);
        return allusers;
     }



     handleChange = (e) => {
         this.setState({
             ...this.state,
             [e.target.name] : e.target.value
         })
     }



     handleEditorChange = (content, editor) => {
        this.setState({
            ...this.state,
            aboutsociety : content
        });
    }



    handleFileChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name] : e.target.files[0]
        });
    }


    handleSocietyDetailsUpdate = async (e) => {
        e.preventDefault();
        let dataobj = {
            name : this.state.name,
            societyimage : this.state.societyimage,
            societybackground : this.state.societybackground,
            title : this.state.title
        }
        this.setState({
            ...this.state,
            name : "",
            societyimage : {},
            societybackground : {},
            title : ""
        });
        await this.props.updateSocietyDetails(this.props.society.data.name , this.props.currentUser.user._id , dataobj );
    }


    handleAddChairpersonOrFaculty = async (dataobj) => {
        
        this.setState({
            ...this.state,
            roletype : dataobj.roletype,
            [dataobj.roletype] : dataobj.data
        });

        let data = {
            roletype : dataobj.roletype,
            [dataobj.roletype] : dataobj.data
        }
    
        await this.props.updateSocietyAddChairpersonOrFaculty(this.props.society.data.name , this.props.currentUser.user._id , data); 
    }

    handleRemoveChairpersonOrFaculty = (dataobj) => {
        this.setState({
            ...this.state,
            [dataobj.roletype] : {}
        });
        
    }


    handleSubmitAboutSociety = async (e) => {
        e.preventDefault();
        let dataobj = {
            aboutsociety : this.state.aboutsociety
        }

        this.setState({
            ...this.state,
            aboutsociety : ""
        });

        await this.props.updateAboutSocietyDetails(this.props.society.data.name , this.props.currentUser.user._id , dataobj );
    }

    render(){

        let filtereData = [];
        let filteredFaculty = [];
        if(this.state.chairpersonsearch !== ""){
            let matches = this.state.allUsers.filter(state => {
                const regex = new RegExp(this.state.chairpersonsearch.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
                return state.email.match(regex) || state.username.match(regex);
            });
            filtereData = matches;
        }

        if(this.state.facultysearch !== ""){
            let matches = this.state.allFaculty.filter(state => {
                const regex = new RegExp(this.state.facultysearch.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
                return state.email.match(regex) || state.username.match(regex);
            });
            filteredFaculty = matches;
        }



        return(
            <div>
               <Navbar />
               <div className="Society-page-settings">
               <h2 className="update-profile-heading">Update Society Page</h2>
               <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">
                        <h3> Society Details </h3>
                        <p>Here you can update society details , background image of society, Society logo.
                            Society title is the main title of your society
                        </p>
                    </div>
                    <div className="col-md-7">
                        <form onSubmit={this.handleSocietyDetailsUpdate}>
                            <div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name"  className="label">Society Name</label>
                                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp"  placeholder="Enter society name"
                                                name="name" value={this.state.name} onChange={this.handleChange} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="societyimage" className="label">Society Image</label>
                                        <input type="file" className="form-control" id="societyimage" aria-describedby="emailHelp"
                                            name="societyimage" onChange={this.handleFileChange} required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="societybackground" className="label">Society background image</label>
                                        <input type="file" className="form-control" id="societybackground" aria-describedby="emailHelp"
                                            name="societybackground" onChange={this.handleFileChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="societytitle" className="label">Society title</label>
                                    <textarea className="form-control" id="societytitle" rows="5" name="title" placeholder="Society title." 
                                    value={this.state.title}  onChange={this.handleChange} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-md btn-primary next-buttons">Update</button> 
                            </div>
                        </form>
                        </div>
                </div>
               <hr className="line-break-line" />
               <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">
                        <h3> Society chairperson and Faculty </h3>
                        <p>
                            Here you can change society's chairperson or faculty.<br /> You can select person that is already on our portal or you can add email of that person
                            so in the future if that person is creating account then you will able to get full details of that person.
                        </p>
                    </div>
                    <div className="col-md-7">
                        <form onSubmit={this.handleChairpersonAndFaculty}>
                          <div className="added-guest-details">
                            <fieldset className="my-fieldset"> 
                              <legend className="login-legend">Society chairperson</legend>
                                {
                                   ( Object.keys(this.state.chairperson).length > 0 ) && (
                                       this.state.chairperson.username ? (
                                        <div className="each-div-of-each-guest">
                                            <div className="each-guest d-flex justify-content-start align-items-center">
                                                <div className="guest-img-session">
                                                    <img src={ this.state.chairperson.imgurl ? this.state.chairperson.imgurl.dataurl : "/images/profile_image.png" } />
                                                </div>
                                                <div className="guest-details d-flex flex-column">
                                                    <h5>{ this.state.chairperson.username }</h5>
                                                    <p>{ this.state.chairperson.email } </p>
                                                </div>
                                                <span onClick={() => {
                                                    this.handleRemoveChairpersonOrFaculty({
                                                        roletype : "chairperson"
                                                    })
                                                }}>
                                                <i class="far fa-times-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                       ) : (
                                        <div className="each-div-of-each-guest">
                                            <div className="each-guest d-flex justify-content-start align-items-center">
                                                <div className="guest-img-session">
                                                    <img src="/images/profile_image.png" />
                                                </div>
                                                <div className="guest-details d-flex flex-column">
                                                    <p>{ this.state.chairperson.email } </p>
                                                </div>
                                                <span onClick={() => {
                                                    this.handleRemoveChairpersonOrFaculty({
                                                        roletype : "chairperson"
                                                    })
                                                }}>
                                                <i class="far fa-times-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                       )
                                    )
                                }
                                {
                                    Object.keys(this.state.chairperson).length === 0 && 
                                    <div style={{ position : "relative" }} className="form-group col-md-10">
                                        <input type="email" className="form-control" id="chairperson" aria-describedby="emailHelp"  placeholder="Enter email of society chairperson"
                                                name="chairpersonsearch" value={this.state.chairpersonsearch} onChange={this.handleChange}/>
                                        <div className="all-filterd-faculty-or-chairperson">
                                        {
                                        filtereData.length > 0 &&
                                            filtereData.map(member => (
                                                <div className="each-search-content-of-society-settings row">
                                                    <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                        <div className="searched-content-img-session">
                                                            <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="user-image" />
                                                        </div>
                                                        <div className="searched-content-user-details">
                                                            <p className="Searched-content-username">{ member.username }</p>
                                                            {
                                                                member.societydetails && 
                                                                <p className="each-content-class-details"> { member.societydetails.name.toUpperCase() }, { member.societydetails.role }</p>
                                                            }
                                                            {
                                                                member.classdetails && 
                                                                <p className="each-content-class-details"><span>{ member.classdetails.department.toUpperCase() }</span> - <span>{member.classdetails.class.toUpperCase()},</span> { member.classdetails.rollno }</p>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                        <button type="button" className="btn btn-md btn-primary add-button-normal-chairperson-or-faculty" onClick={ () => {
                                                            this.handleAddChairpersonOrFaculty({
                                                                roletype :  "chairperson",
                                                                data : member
                                                            })
                                                            }
                                                            }>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            )) 
                                        }
                                      </div>
                                      {
                                          filtereData.length === 0 &&
                                            <button className="btn btn-sm btn-primary add-buttons-for-chairperson-or-faculty" type="button"
                                                onClick={() => {
                                                    this.handleAddChairpersonOrFaculty({
                                                        roletype : "chairperson",
                                                        data : { email : this.state.chairpersonsearch } 
                                                })
                                            }}
                                            >Add</button>
                                      }
                                    </div>
                                }
                               </fieldset>
                               <fieldset className="my-fieldset"> 
                                 <legend className="login-legend faculty-fieldset">Society Faculty</legend>
                                {/* // Faculty Email */}
                                {
                                   ( Object.keys(this.state.faculty).length > 0 ) && (
                                       this.state.faculty.username ? (
                                        <div className="each-div-of-each-guest">
                                            <div className="each-guest d-flex justify-content-start align-items-center">
                                                <div className="guest-img-session">
                                                    <img src={ this.state.faculty.imgurl ? this.state.faculty.imgurl.dataurl : "/images/profile_image.png" } />
                                                </div>
                                                <div className="guest-details d-flex flex-column">
                                                    <h5>{ this.state.faculty.username }</h5>
                                                    <p>{ this.state.faculty.email } </p>
                                                </div>
                                                <span onClick={() => {
                                                    this.handleRemoveChairpersonOrFaculty({
                                                        roletype : "faculty"
                                                    })
                                                }}>
                                                <i class="far fa-times-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                       ) : (
                                        <div className="each-div-of-each-guest">
                                            <div className="each-guest d-flex justify-content-start align-items-center">
                                                <div className="guest-img-session">
                                                    <img src="/images/profile_image.png" />
                                                </div>
                                                <div className="guest-details d-flex flex-column">
                                                    <p>{ this.state.faculty.email } </p>
                                                </div>
                                                <span onClick={() => {
                                                    this.handleRemoveChairpersonOrFaculty({
                                                        roletype : "faculty"
                                                    })
                                                }}>
                                                <i class="far fa-times-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                       )
                                    )
                                }
                                {
                                    Object.keys(this.state.faculty).length === 0 && 
                                    <div style={{ position : "relative" }} className="form-group col-md-10">
                                        <input type="email" className="form-control" id="facultysearch" aria-describedby="emailHelp"  placeholder="Enter email of society chairperson"
                                                name="facultysearch" value={this.state.facultysearch} onChange={this.handleChange}/>
                                        <div className="all-filterd-faculty-or-chairperson">       
                                        {
                                        filteredFaculty.length > 0 &&
                                            filteredFaculty.map(member => (
                                                <div className="each-search-content-of-society-settings row">
                                                    <div className="serached-profile-content col-12 col-md-8 d-flex justify-content-center justify-content-md-start  align-items-center">
                                                        <div className="searched-content-img-session">
                                                            <img src={ member.imgurl ? member.imgurl.dataurl : "/images/profile_image.png" } alt="user-image" />
                                                        </div>
                                                        <div className="searched-content-user-details">
                                                            <p style={{ margin: "0px", fontSize : "14px" }} className="Searched-content-username">{ member.username }</p>
                                                            {
                                                                member.societydetails && 
                                                                <p style={{ margin: "0px", fontSize : "13px" }}> { member.societydetails.name.toUpperCase() }, { member.societydetails.role }</p>
                                                            }
                                                            {
                                                                member.classdetails && 
                                                                <p style={{ margin: "0px", fontSize : "13px" }}><span>{ member.classdetails.department.toUpperCase() }</span> - <span>{member.classdetails.class.toUpperCase()},</span> { member.classdetails.rollno }</p>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="view-profile-button col-12 col-md-4 d-flex justify-content-center align-items-center">
                                                        <button type="button" className="btn btn-md btn-primary add-button-normal-chairperson-or-faculty" onClick={ () => {
                                                                this.handleAddChairpersonOrFaculty({
                                                                    roletype : "faculty",
                                                                    data : member
                                                                })
                                                            }
                                                            }>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            )) 
                                        }
                                        
                                        </div>
                                        {
                                             filteredFaculty.length === 0 &&
                                                <button className="btn btn-sm btn-primary add-buttons-for-chairperson-or-faculty" type="button"
                                                    onClick={() => {
                                                        this.handleAddChairpersonOrFaculty({
                                                            roletype : "faculty",
                                                            data : { email : this.state.facultysearch }
                                                        })
                                                        
                                                    }}
                                                >Add</button>
                                        }
                                    </div>
                                }
                                </fieldset>
                            </div>
                        </form>
                        </div>
                </div>
                <hr className="line-break-line" />
                <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">
                        <h3> About Society </h3>
                        <p>Here you can edit the about society content. Create dynamic contant it supports all time of facility including emojies.</p>
                    </div>
                    <div className="col-md-7">
                        {
                        ( this.state.name !== "" ) &&
                            <form onSubmit={this.handleSubmitAboutSociety}>
                            <div className="form-group">
                               <label htmlFor="exampleFormControlTextarea2" className="label">About Sociey</label>
                                <Editor
                                   apiKey='pxg7pzt47h19vlvcja130m3fawin2cvj7o5bu8sjnlkw83kx'
                                   initialValue={ this.state.aboutsociety }
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
                       <button type="submit" className="btn btn-md btn-primary next-buttons">Update</button> 
                   </form>
               
                        }
                     </div>   
                </div>
                <hr className="line-break-line" />
                <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">   
                        <h3>Manage Members</h3>
                        <p>
                            Here you can manage your members and you can add members, delete existing one.<br />
                            <strong>If you are your members please upload the google sheet to our website and we will automatially fetch the details of your members.</strong>
                        </p>
                    </div>
                    <div className="society-seslection-session col-md-7 d-flex justify-content-center align-items-center">
                        <Link to={ `/society/${this.props.society.data.name}/edit/society/${this.props.society.data._id}/managemembers` } className="btn btn-sm btn-primary send-email-button" type="button" >Manage Members</Link>
                    </div>
                </div>
                <hr className="line-break-line" />
                <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">   
                        <h3> Manage Admin </h3>
                        <p>
                            Admin are those persons who can create events for your society. And they can edit society page.
                        </p>
                    </div>
                    <div className="society-seslection-session col-md-7 d-flex justify-content-center align-items-center">
                        <Link to={ `/society/${this.props.society.data.name}/edit/society/${this.props.society.data._id}/manageadmins` } className="btn btn-sm btn-primary send-email-button" type="button" >Manage Admins</Link>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    society : state.society
}) 


export default connect(mapStateToProps , { loadSocietyData  , fetchSocietyMembersFullDetails , fetchAllUsers , updateSocietyDetails , updateAboutSocietyDetails , updateSocietyAddChairpersonOrFaculty })(SocietySettings);