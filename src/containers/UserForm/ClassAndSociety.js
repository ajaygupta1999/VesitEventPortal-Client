import React, { Component } from 'react';
import Navbar from '../navbar';
import "../../asserts/css/Forms.scss";
import {setClassAndSocietyDetails} from "../../stores/actions/userRegisterDetails";
import { connect } from "react-redux"; 


class ClassAndSociety extends Component{
   
    constructor(props) {
        super(props)
        this.state = {
            department : "cmpn",
            currentyear : "3",
            class : "d12c",
            rollno : "",
            semester : "",
            society : "none",
            role : "none"
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.currentUser.isAuthenticated){
            this.props.setClassAndSocietyDetails(this.state , this.props.currentUser.user.id)
            .then(() => {
                console.warn(this.props.history);
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
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1" className="label">College Department</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="department" value="IT" onChange={this.handleChange} value={this.state.department} placeholder="Select Branch">
                              <option value="cmpn">CMPN</option>
                              <option value="it">IT</option>
                              <option value="extc">EXTC</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1" className="label">Current Year of Study</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="currentyear" onChange={this.handleChange} value={this.state.currentyear}>
                              <option value="1">FE</option>
                              <option value="2">SE</option>
                              <option value="3">TE</option>
                              <option value="4">BE</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="exampleFormControlSelect1">Class</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="class" onChange={this.handleChange} value={this.state.class}>
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
								 name="rollno" value={this.state.rollno} onChange={this.handleChange} />
						</div>
						<div className="form-group">
						 <label htmlFor="login-login"  className="label">Semester</label>
							<div className="password">
							<input type="number" className="form-control" id="login-login" aria-describedby="emailHelp"  placeholder="Enter Your Current Semester"
								   name="semester" value={this.state.semester} onChange={this.handleChange}/>
							</div>
                         </div>
                         <div className="small-message-related-to-text">
                             <p>If You are a member/council-member/society-head/HOD then fill the details otherwise you
                                can skip this part.</p>
                         </div>
                         <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1" className="label">Society Name(From Which you belong)</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="society" value={this.state.society} onChange={this.handleChange}>
                              <option value="none">None</option>
                              <option value="isa">ISA</option>
                              <option value="ieee">IEEE</option>
                              <option value="csi">CSI</option>
                              <option value="iste">ISTE</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1" className="label">Role(What is your role in that society)</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="role" onChange={this.handleChange} value={this.state.role}>
                              <option value="none">None</option>
                              <option value="normal-member">Normal-member</option>
                              <option value="council-member">council-member</option>
                              <option value="council-head">council-head</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-end" id="forgotpassword">
                            <div>
                                <button type="submit" className="btn btn-primary btn-md btn-block">Submit</button>
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


export default connect(mapStateToProps , { setClassAndSocietyDetails })(ClassAndSociety);
