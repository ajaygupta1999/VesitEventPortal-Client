import React, { Component } from 'react';
import Navbar from '../navbar';
import "../../asserts/css/Forms.scss";
import {setClassAndSocietyDetails , fetchusersocietydetails } from "../../stores/actions/userRegisterDetails";
import { connect } from "react-redux"; 


class ClassAndSociety extends Component{
   
    constructor(props) {
        super(props)
        this.state = {
            isgotsocietydata : false,
            role : "student",
            student : {
                department : "cmpn",
                currentyear : "3",
                class : "d12c",
                rollno : "",
                semester : "",
            },
            society : "none",
            societyrole : "none",
            specificrole : "",
            societydataarr : []
        }
    }
    
    handleChange = (e) => {
        
        let dataarr = e.target.name.split("_");
        if(dataarr.length == 2){
            this.setState({
                ...this.state,
                student : {
                    ...this.state.student,
                    [dataarr[1]] : e.target.value
                }
            });
        }else{
            this.setState({
                ...this.state,
                [e.target.name] : e.target.value
            });
        }  
    }

    fetchusersocietydetails = async () => {
        let societydata = await this.props.fetchusersocietydetails(this.props.currentUser.user._id);
        if(societydata.insociety === 1){
            this.setState({
                ...this.state,
                isgotsocietydata : true,
                society : societydata.societydetails[0].name,
                societyrole : societydata.societydetails[0].role,
                societydataarr : societydata.societydetails
            });
        }else{
            this.setState({
                ...this.state,
                isgotsocietydata : true,
                society : "none",
                societyrole : "none",
                societydataarr : societydata.societydetails
            })
        }
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.currentUser.isAuthenticated){
            let dataobj = {};
            if(this.state.role === "student"){
                dataobj.role = this.state.role;
                dataobj.department = this.state.student.department;
                dataobj.class = this.state.student.class;
                dataobj.rollno = this.state.student.rollno;
                dataobj.currentyear = this.state.student.currentyear;
                dataobj.semester = this.state.student.semester;
                dataobj.society = this.state.society;
                dataobj.societyrole = this.state.societyrole;
                if( this.state.societyrole !== "faculty"){
                    dataobj.specificrole = this.state.specificrole;
                }
            }else{
                // Role teacher
                dataobj.role = this.state.role;
                dataobj.society = this.state.society;
                dataobj.societyrole = this.state.societyrole;
            }

            console.log("manuplated data ==> " , dataobj);

       
            this.props.setClassAndSocietyDetails(dataobj, this.props.currentUser.user._id)
            .then(() => {
                this.props.history.push("/"); 
            }).catch(() => {
                return;
            });
        }
    }
   
   
   
    render(){
        return(
            <div>
            <Navbar />
            <div className="our-login-page-content">
			<div id="login-container">
				<div className="login-page-contant">
					<form className="submit-forms" onSubmit={this.handleSubmit}>
                        <center><h1 className="new-h1">Class & Society Details</h1></center>
                        <div className="row">
                            <div className="col-12 col-md-5 description-about-each-form">
                                <h5>Users Details</h5>
                                <p> 
                                   Please fill your details. if you are a student then select student and fill your class and others details. But if you are faculty then just select and proceed.
                                </p>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="roleofuser" className="label">Role</label>
                                    <select className="form-control" id="roleofuser" name="role" onChange={this.handleChange} value={this.state.role} placeholder="Role of the user.">
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    </select>
                                </div>
                                {
                                    this.state.role === "student" && 
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1" className="label">College Department</label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="student_department" value="IT" onChange={this.handleChange} value={this.state.student_department} placeholder="Select Branch">
                                            <option value="cmpn">CMPN</option>
                                            <option value="it">IT</option>
                                            <option value="extc">EXTC</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1" className="label">Current Year of Study</label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="student_currentyear" onChange={this.handleChange} value={this.state.student_currentyear}>
                                            <option value="1">FE</option>
                                            <option value="2">SE</option>
                                            <option value="3">TE</option>
                                            <option value="4">BE</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="label" htmlFor="exampleFormControlSelect1">Class</label>
                                            <select className="form-control" id="exampleFormControlSelect1" name="student_class" onChange={this.handleChange} value={this.state.student_class}>
                                            <option value="d12c">D12C</option>
                                            <option value="d7c">D7C</option>
                                            <option value="d2c">D2C</option>
                                            <option value="d19c">D19C</option>
                                            <option value="d15c">D15C</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username"  className="label">Roll No</label>
                                            <input type="number" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter your Roll No"
                                                    name="student_rollno" value={this.state.student_rollno} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-login"  className="label">Semester</label>
                                            <div className="password">
                                                <input type="number" className="form-control" id="login-login" aria-describedby="emailHelp"  placeholder="Enter Your Current Semester"
                                                    name="student_semester" value={this.state.student_semester} onChange={this.handleChange}/>
                                                </div>
                                        </div>
                                   </div>
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <h5>Society Details</h5>
                                <p>
                                    If you belongs to some society then click this button it will automatically fetch the details of society.<br/>
                                    In the society, you can be Council Member/Council Head/ Society Member/Faculty.<br/>
                                    Faculty can also click this button to get details that in which society they are faculty.
                                </p>
                            </div>
                            <div className="col-12 col-md-7">
                                {
                                    this.state.societydataarr.length > 1 && 
                                    <div className="multiple-society-detials">
                                        <p>please call these societies to update their record. Then you will able to get correct society details.</p>
                                        {
                                          this.state.societydataarr.map(society => {
                                              return <div className="d-flex flex-row">
                                                        <div>
                                                            <img className="society-incharge-and-chairperson-image" style={{ width : "50px" , height : "50px" , borderRadius : "25px" }} src="/images/user-img1.jpg" alt="user-profile-img"/>
                                                        </div>
                                                        <div className="d-flex flex-column">
                                                            <p className="incharge-name">{ society.name }</p>
                                                            <p className="role-of-person">{ society.role }</p>
                                                        </div>
                                                    </div> 
                                          })
                                        }
                                    </div>
                                }
                                {
                                   ( this.state.societydataarr.length === 0 &&  this.state.isgotsocietydata ) &&
                                        <p> It seems that you do not belongs to any society. If you think you are a member of some society.<br/>
                                        So please contact them. Then only you will able to get the correct society details.  </p>  
                                }
                                {
                                    this.state.isgotsocietydata && 
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="societyname"  className="label">Roll No</label>
                                            <input type="text" className="form-control" id="societyname" aria-describedby="emailHelp"
                                                    name="society" value={this.state.society} onChange={this.handleChange} disabled/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="societyrole"  className="label">Roll No</label>
                                            <input type="text" className="form-control" id="societyrole" aria-describedby="emailHelp" 
                                                    name="societyrole" value={this.state.societyrole} onChange={this.handleChange} disabled/>
                                        </div>
                                        {
                                           ( this.state.societydataarr.length === 1 && this.state.societyrole !== "faculty" ) ? 
                                            <div className="form-group">
                                                <label htmlFor="specificrole"  className="label">Specific role in the society</label>
                                                <input type="text" className="form-control" id="specificrole" aria-describedby="emailHelp" placeholder="Enter specific role in the society."
                                                    name="specificrole" value={this.state.specificrole} onChange={this.handleChange} />
                                            </div> : null
                                        }
                                        
                                    </div>
                                }
                                <div className="society-seslection-session">
                                   <button className="btn btn-sm btn-primary send-email-button" type="button" onClick={this.fetchusersocietydetails}>Get Society Detials</button>
                                </div>
                            </div>
                        </div>
                         <div className="d-flex justify-content-end" id="forgotpassword">
                            <div>
                                <button type="submit" className="btn btn-primary btn-md btn-block next-buttons">Submit</button>
                            </div>
						</div>
					</form>
				</div>
			</div>
        </div>
        </div>
        );
    }
}


function mapStateToProps(state){
    return {
        currentUser : state.currentUser
    }
} 


export default connect(mapStateToProps , { setClassAndSocietyDetails , fetchusersocietydetails })(ClassAndSociety);
