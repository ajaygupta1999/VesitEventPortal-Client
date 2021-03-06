import React, { Component } from 'react';
import  { connect } from "react-redux"; 
import Navbar from "../navbar";
import { getFileData } from "../../stores/actions/events";
import { 
  createSpreadSheet, 
  dataSync, 
  loadSocietyData , 
  fetchSocietyMembersFullDetails,
  handleAddSocietyMemeber, 
  handleAddCouncilMemeber , 
  handleAddFacultyAndChairperson , 
  handleRemoveSocietyMember, 
  handleRemoveCouncilMember, 
  handleRemoveFacultyOrChairperson,
  handleEditSocietyMemeber,
  handleEditCouncilMemeber
 } from "../../stores/actions/society";


import "../../asserts/css/Notification.scss";
import "../../asserts/css/SocietyMembers.scss"; 
import { Link } from 'react-router-dom';
import { parse } from "query-string";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';


var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';


class SocietySettingsManageMembers extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAddingCouncilMembers : false,
            isAddingSocietyMembers : false,
            isSyncingSocietyMembersData : false,
            isSyncingCouncilMembersData  : false,
            isSyncingChairpersonAndFacultyData : false,
            isLoadingData : false,
            isCreatingSheet : false,
            initialisingSheetApi : false,
            isNewAddSocietyMember : false,
            isNewAddCouncilMember : false,
            isNewAddFacultyOrChairperson : false,
            societyMembers : [],
            councilMembers : [],
            faculty : {
              name: "",
              email : ""
            },
            chairperson : {
              name: "",
              email : "" 
            },
            societyMemberData : {
              name : "",
              email : ""
            },
            councilMemberData : {
              name : "",
              email : "",
              specificRole :""
            },
            facultyAndChairpersonData : {
                name : "",
                email : "",
                personType :  "faculty"
            },
            authRelatedData : {
                name: '',
                email: '',
                accesstoken : "",
                googleAuth: '',
                imgurl : "",
                sheeturl_of_society_members : "",
                sheeturl_of_council_members : "",
                sheeturl_of_faculty_and_chairperson : ""
            }
        }
    }


    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(prevProps.society.data.normal_members) !== JSON.stringify(this.props.society.data.normal_members)){
            let societyMemberArr = this.props.society.data.normal_members.map(member => ({
                ...member,
                editing :{
                   isEditing : false,
                   isUpdating : false,
                   name : member.name,
                   email : member.email
                }
            }));

            this.setState({
                ...this.state,
                societyMembers : societyMemberArr
            });
        }

        if(JSON.stringify(prevProps.society.data.council_members) !== JSON.stringify(this.props.society.data.council_members)){
            let councilMemberArr = this.props.society.data.council_members.map(member => ({
              ...member,
              editing :{
                  isEditing : false,
                  isUpdating : false,
                  name : member.name,
                  email : member.email,
                  role : "councilmember",
                  specificrole : member.specificrole
              }
            }));

            this.setState({
                ...this.state,
                councilMembers : councilMemberArr
            });
        }

        if(JSON.stringify(prevProps.society.data.spreadsheets) !== JSON.stringify(this.props.society.data.spreadsheets)){
            let sheeturl_of_society_members = "";
            let sheeturl_of_council_members = "";
            let sheeturl_of_faculty_and_chairperson = "";
            if(this.props.society.data.spreadsheets){
                sheeturl_of_society_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.normal_members.sheetid;
                sheeturl_of_council_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.council_member.sheetid;
                sheeturl_of_faculty_and_chairperson = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.facultyorchairperson.sheetid;
            }
            console.log("Sheet url has been changed");
            this.setState({
              ...this.state,
              authRelatedData : {
                ...this.state.authRelatedData,
                sheeturl_of_society_members,
                sheeturl_of_council_members,
                sheeturl_of_faculty_and_chairperson
              }
            });
        }
        
      
        if((JSON.stringify(prevProps.society.data.faculty) !== JSON.stringify(this.props.society.data.faculty) ) || 
        ( JSON.stringify(prevProps.society.data.chairperson) !== JSON.stringify(this.props.society.data.chairperson) ) ){            
            this.setState({
              ...this.state,
              faculty :{
                editing :{
                    isUpdating : false,
                    isEditing : false,
                    name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
                    email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
                },
                name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
                email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
              },
              chairperson : {
                 editing :{
                    isUpdating : false,
                    isEditing : false,
                    name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
                    email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : ""
                 },
                 name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
                 email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : "" 
              }
            });
        }
    }

    componentWillUnmount  = () => {
        console.log("Component has been unmounted");
        if(this.state.authRelatedData.email.length > 0){
            this.signOutFunction();
        }
    }


    componentDidMount = async () => {
      try{
        this.setState({
          ...this.state,
          isLoadingData : true
        });
        await this.props.loadSocietyData(this.props.match.params.societyname);
        await this.props.fetchSocietyMembersFullDetails(this.props.match.params.societyid);
        let sheeturl_of_society_members = "";
        let sheeturl_of_council_members = "";
        let sheeturl_of_faculty_and_chairperson = "";
        if(this.props.society.data.spreadsheets){
            sheeturl_of_society_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.normal_members.sheetid;
            sheeturl_of_council_members = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.council_member.sheetid;
            sheeturl_of_faculty_and_chairperson = "https://docs.google.com/spreadsheets/d/" + this.props.society.data.spreadsheets.sheetid + "/edit#gid=" + this.props.society.data.spreadsheets.facultyorchairperson.sheetid;
        }

        let societyMemberArr = this.props.society.data.normal_members.map(member => ({
            ...member,
            editing :{
              isEditing : false,
              name : member.name,
              email : member.email
            }
        }));

        let councilMemberArr = this.props.society.data.council_members.map(member => ({
          ...member,
          editing : { 
            isEditing : false,
            name : member.name,
            email : member.email,
            role : "councilmember",
            specificrole : member.specificrole
          }
        }));

        this.setState({
          ...this.state,
          societyMembers : societyMemberArr,
          councilMembers : councilMemberArr,
          isLoadingData : false,
          initialisingSheetApi : true,
          faculty : {
            editing :{
              isEditing : false,
              name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
              email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
            },
            name : this.props.society.data.faculty ? this.props.society.data.faculty.name : "",
            email : this.props.society.data.faculty ? this.props.society.data.faculty.email : ""
          },
          chairperson : {
            editing :{
              isEditing : false,
              name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
              email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : ""
            },
             name : this.props.society.data.chairperson ? this.props.society.data.chairperson.name : "",
            email : this.props.society.data.chairperson ? this.props.society.data.chairperson.email : "" 
          },
          authRelatedData :  {
             ...this.state.authRelatedData,
             sheeturl_of_society_members,
             sheeturl_of_council_members,
             sheeturl_of_faculty_and_chairperson
          }
        });

        var script = document.createElement('script');
        script.onload = this.handleClientLoad;
        script.src="https://apis.google.com/js/api.js";
        document.body.appendChild(script);
      }catch(err){
        console.log(err);
      }
    }


    handleClientLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }
 
    initClient = () => {
        try{
            window.gapi.client.init({
              'apiKey': "AIzaSyCGBe67F63wHgvUdJHe37-HUKYa1jcOe8Y",
              // 'clientId': "178137140437-0repk8r5su4fdlcvjhh6s3fb1uplo2ug.apps.googleusercontent.com",
              // 'scope': SCOPE,
              'discoveryDocs': [discoveryUrl]
            }).then(() => {
              
              this.setState({
                ...this.state,
                initialisingSheetApi : false,
                authRelatedData : {
                  ...this.state.authRelatedData,
                  googleAuth: window.gapi.auth2.getAuthInstance()
                }
              });

              if(!this.state.authRelatedData.googleAuth.isSignedIn.get()) {
                  console.log("Please login first");
              }
          } , function(err){
               console.log(err);
          });

        }catch(e){
          console.log(e);
        }
    }


    signInFunction = async () => {
        await this.state.authRelatedData.googleAuth.signIn();
        this.updateSigninStatus();
    }

    signOutFunction = async () => {
        await this.state.authRelatedData.googleAuth.signOut();
        this.updateSigninStatus();
    }

    updateSigninStatus = async () => {
        if(!this.state.authRelatedData.googleAuth.isSignedIn.get()) {
            console.log("Please login first ======>");
            this.setState({
              ...this.state,
              authRelatedData : {
                 ...this.state.authRelatedData,
                 name: "",
                 email: "",
                 accesstoken : "",
              }
            });
        }else{
            var user = this.state.authRelatedData.googleAuth.currentUser.get();
            var accesstoken = this.state.authRelatedData.googleAuth.currentUser.get().getAuthResponse().access_token;
            let username = user.getBasicProfile().getName();
            let email = user.getBasicProfile().getEmail();
            let imgurl = user.getBasicProfile().getImageUrl();
            // Sheet exist == login
            // sheet not exist sign in
           if(this.props.society.data.spreadsheets){
               if(this.props.society.data.spreadsheets.sheetid && this.props.society.data.spreadsheets.useremail && 
                ( this.props.society.data.spreadsheets.useremail === email )){
                    this.setState({
                      ...this.state,
                      authRelatedData : {
                        ...this.state.authRelatedData,
                        name: username,
                        accesstoken : accesstoken,
                        email : email,
                        imgurl
                      }
                    });
                }
           }else{
              this.setState({
                ...this.state,
                authRelatedData : {
                  ...this.state.authRelatedData,
                  name: username,
                  accesstoken : accesstoken,
                  email : email,
                  imgurl
                }
              });
           }
            
            // if(this.props.society.data.spreadsheets && this.props.society.data.spreadsheets.sheetid && this.props.society.data.spreadsheets.useremail && 
            //   ( this.props.society.data.spreadsheets.useremail === email )){
            //     this.setState({
            //       ...this.state,
            //       authRelatedData : {
            //         ...this.state.authRelatedData,
            //         name: username,
            //         accesstoken : accesstoken,
            //         email : email,
            //         imgurl
            //       }
            //     });
            // }
            if(this.props.society.data.spreadsheets && this.props.society.data.spreadsheets.sheetid && this.props.society.data.spreadsheets.useremail && 
              ( this.props.society.data.spreadsheets.useremail !== email)){
                  this.addErrorNotification(this.props.society.data.spreadsheets.useremail);
                  console.log("Please login with correct gmail account ==> " , this.props.society.data.spreadsheets.useremail);
              }
                
            
        }
    }

    
    handleCreateSpreadSheet = async () => {
      this.setState({
        ...this.state,
        isCreatingSheet : true
      });
        let spreadsheetdata;
        if(this.state.authRelatedData.accesstoken.length === 0 && this.state.authRelatedData.sheeturl_of_council_members.length > 0){
            await this.signInFunction();
            return;
        }
        
        if(this.state.authRelatedData.accesstoken.length === 0 && this.state.authRelatedData.sheeturl_of_council_members.length === 0){
            await this.signInFunction();
        }
        let data = {
            useremail : this.state.authRelatedData.email,
            accesstoken : this.state.authRelatedData.accesstoken
        }
        await this.props.createSpreadSheet(this.props.society.data.name , this.props.society.data._id , data);
        this.setState({
          ...this.state,
          isCreatingSheet : false
        });
        // this.setState({
        //   ...this.state,
        //   authRelatedData : {
        //     ...this.state.authRelatedData,
        //     sheeturl : society.spreadsheets.sheetid
        //   }
        // });
        
    }

    addNewSocietyMember = () => {
      this.setState({
         ...this.state,
         isNewAddSocietyMember : !this.state.isNewAddSocietyMember
      });
    }

    addNewCouncilMember = () => {
        this.setState({
            ...this.state,
            isNewAddCouncilMember : !this.state.isNewAddCouncilMember
        });
    }

    addNewFacultyOrChairperson = () => {
      this.setState({
        ...this.state,
        isNewAddFacultyOrChairperson : !this.state.isNewAddFacultyOrChairperson
       });
    }

    handleChange = (e) => {
        let fieldarr = e.target.name.split("_");
        if(fieldarr[0] === "societymember"){
            this.setState({
              ...this.state,
              societyMemberData : {
                ...this.state.societyMemberData,
                [fieldarr[1]] : e.target.value  
              }
            });
        }

        if(fieldarr[0] === "councilmember"){
            this.setState({
              ...this.state,
              councilMemberData : {
                ...this.state.councilMemberData,
                [fieldarr[1]] : e.target.value  
              }
            });
        }

        if(fieldarr[0] === "facultyAndChairpersonData"){
            this.setState({
                ...this.state,
                facultyAndChairpersonData : {
                  ...this.state.facultyAndChairpersonData,
                  [fieldarr[1]] : e.target.value
                }
            });
        }
    }


    handleAddMember = async (e , data) => {
       //  Handle submit
       e.preventDefault();
       let dataobj = {};
       if(data.from === "society_member"){
            this.setState({
              ...this.state,
              isAddingSocietyMembers : true
            });
            dataobj.name = this.state.societyMemberData.name;
            dataobj.email = this.state.societyMemberData.email;
            if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
                dataobj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleAddSocietyMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
            this.setState({
              ...this.state,
              isAddingSocietyMembers : false,
              isNewAddSocietyMember : false,
              societyMemberData : {
                name : "",
                email : ""
              }
            });
       }

       if(data.from === "council_member"){
            this.setState({
              ...this.state,
              isAddingCouncilMembers : true
            });
            dataobj.name = this.state.councilMemberData.name;
            dataobj.email = this.state.councilMemberData.email;
            dataobj.role = "council_member";
            dataobj.specificrole = this.state.councilMemberData.specificRole;
            if(this.state.authRelatedData.sheeturl_of_council_members.length > 0){
              dataobj.accesstoken = this.state.authRelatedData.accesstoken;
            } 
            await this.props.handleAddCouncilMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
            this.setState({
              ...this.state,
              isAddingCouncilMembers : false,
              isNewAddCouncilMember : false,
              councilMemberData : {
                name : "",
                email : "",
                specificRole : ""
              }
            });
       }

       if(data.from === "faculty_and_chairperson"){
          if(this.state.faculty.email.length === 0 || this.state.chairperson.email.length === 0 ){
              dataobj.name = this.state.facultyAndChairpersonData.name;
              dataobj.email = this.state.facultyAndChairpersonData.email;
              dataobj.role = this.state.facultyAndChairpersonData.personType;
              if(this.state.authRelatedData.sheeturl_of_faculty_and_chairperson.length > 0){
                dataobj.accesstoken = this.state.authRelatedData.accesstoken;
              }
              await this.props.handleAddFacultyAndChairperson(this.props.society.data.name , this.props.society.data._id , dataobj);
              this.setState({
                ...this.state,
                isNewAddFacultyOrChairperson : false,
                facultyAndChairpersonData : {
                  name : "",
                  email : "",
                  personType : "faculty"
                }
              });
          }else{
            console.log("Already one faculty and one chairperson exist.");
          }
       }
    }


    handleDataSync = async (dataobj) => {
        try{
          if(dataobj.from === "normal_member"){
              this.setState({
                ...this.state,
                isSyncingSocietyMembersData : true
              });
          }
          
          if(dataobj.from === "council_member"){
            this.setState({
              ...this.state,
              isSyncingCouncilMembersData : true
            });
          }

          if(dataobj.from === "faculty_and_chairperson"){
            this.setState({
              ...this.state,
              isSyncingChairpersonAndFacultyData : true
            });
          }

          let data = {
            useremail : this.state.authRelatedData.email,
            accesstoken : this.state.authRelatedData.accesstoken,
            requestFrom : dataobj.from
          }
          let dataFromServer = await this.props.dataSync(this.props.society.data.name , this.props.society.data._id ,  data);
          if(dataobj.from === "normal_member"){
            this.setState({
              ...this.state,
              isSyncingSocietyMembersData : false
            });
        }
        
        if(dataobj.from === "council_member"){
          this.setState({
            ...this.state,
            isSyncingCouncilMembersData : false
          });
        }

        if(dataobj.from === "faculty_and_chairperson"){
          this.setState({
            ...this.state,
            isSyncingChairpersonAndFacultyData : false
          });
        }

        }catch(err){
          console.log(err.message);
        }
    }

    handleRemoveMember = async (dataobj) => {
        // generate object fro request
        // find which type of person it is
        // send request to back on server
        let obj = {};
        if(dataobj.personType === "society_member"){
           obj.name = dataobj.name;
           obj.email = dataobj.email;
           obj.role = "normal_member";
           if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
           }
           console.log("dataobj ==> " , obj);
           await this.props.handleRemoveSocietyMember(this.props.society.data.name , this.props.society.data._id , obj);
        }

        if(dataobj.personType === "council_member"){
            obj.name = dataobj.name;
            obj.email = dataobj.email;
            obj.role = dataobj.role;
            obj.specificrole = dataobj.specificrole;
            if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleRemoveCouncilMember(this.props.society.data.name , this.props.society.data._id , obj);
        }
 
        if(dataobj.personType === "faculty_and_chairperson"){
            obj.name = dataobj.name;
            obj.email = dataobj.email;
            obj.role = dataobj.role;
            if(this.state.authRelatedData.sheeturl_of_faculty_and_chairperson.length > 0){
              obj.accesstoken = this.state.authRelatedData.accesstoken;
            }
            await this.props.handleRemoveFacultyOrChairperson(this.props.society.data.name , this.props.society.data._id , obj);
        }

    } 

    handleEditMember = async (dataobj) => {
        if(dataobj.personType === "society_member"){
            this.setState({
               ...this.state,
               societyMembers : this.state.societyMembers.map(member => {
                   if(member._id.toString() === dataobj.id.toString()){
                      return { ...member , editing : { ...member.editing , isEditing : !member.editing.isEditing } }
                   }
                   return member;
               }) 
            })
        }

        if(dataobj.personType === "council_member"){
          this.setState({
             ...this.state,
             councilMembers : this.state.councilMembers.map(member => {
                 if(member._id.toString() === dataobj.id.toString()){
                    return { ...member , editing : { ...member.editing , isEditing : !member.editing.isEditing } }
                 }
                 return member;
             }) 
          })
        }

        if(dataobj.personType === "faculty"){
            this.setState({
              ...this.state,
              faculty : {
                ...this.state.faculty,
                editing : { ...this.state.faculty.editing , isEditing : !this.state.faculty.editing.isEditing }
              }
            })
        }

        if(dataobj.personType === "chairperson"){
          this.setState({
            ...this.state,
            chairperson : {
              ...this.state.chairperson,
              editing : { ...this.state.chairperson.editing , isEditing : !this.state.chairperson.editing.isEditing }
            }
          });
        }
    }

    handleEditChange = (e , dataobj) => {
      let fieldarr = e.target.name.split("_");
      if(fieldarr[0] === "societymember"){
          this.setState({
            ...this.state,
            societyMembers : this.state.societyMembers.map(member => {
                if(member._id.toString() === dataobj.id.toString()){
                   return {
                      ...member,
                      editing : {
                        ...member.editing,
                        [fieldarr[1]] : e.target.value
                      }
                   }
                }

                return member;
            })
          });
      }

      if(fieldarr[0] === "councilmember"){
        this.setState({
          ...this.state,
          councilMembers : this.state.councilMembers.map(member => {
              if(member._id.toString() === dataobj.id.toString()){
                 return {
                    ...member,
                    editing : {
                      ...member.editing,
                      [fieldarr[1]] : e.target.value
                    }
                 }
              }

              return member;
          })
        });
    }

    if(fieldarr[0] === "facultyAndChairpersonData"){
          this.setState({
              ...this.state,
              facultyAndChairpersonData : {
                ...this.state.facultyAndChairpersonData,
                [fieldarr[1]] : e.target.value
              }
          });
      }
       
    }

    handleEditMemberSubmit = async (e , data) => {
       e.preventDefault();
       let dataobj = {};
       if(data.personType === "society_member"){
          this.setState({
              ...this.state,
              societyMembers : this.state.societyMembers.map(member => {
                  if(member._id.toString() === data.id.toString()){
                    return { ...member , editing : { ...member.editing , isUpdating : true } }
                  }
                  return member;
              }) 
          });
          dataobj.id = data.id;
          dataobj.name = data.name;
          dataobj.email = data.email;
          if(this.state.authRelatedData.sheeturl_of_society_members.length > 0){
              dataobj.accesstoken = this.state.authRelatedData.accesstoken;
          }
          await this.props.handleEditSocietyMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
          this.setState({
              ...this.state,
              societyMembers : this.state.societyMembers.map(member => {
                  if(member._id.toString() === data.id.toString()){
                    return { ...member , editing : { ...member.editing , isUpdating : false } }
                  }
                  return member;
              }) 
          });
       }

       if(data.personType === "council_member"){
          this.setState({
              ...this.state,
              councilMembers : this.state.councilMembers.map(member => {
                  if(member._id.toString() === data.id.toString()){
                    return { ...member , editing : { ...member.editing , isUpdating : true } }
                  }
                  return member;
              }) 
          })
          dataobj.id = data.id;
          dataobj.name = data.name;
          dataobj.email = data.email;
          dataobj.role = data.role;
          dataobj.specificrole = data.specificrole;
          if(this.state.authRelatedData.sheeturl_of_council_members.length > 0){
              dataobj.accesstoken = this.state.authRelatedData.accesstoken;
          }
          await this.props.handleEditCouncilMemeber(this.props.society.data.name , this.props.society.data._id , dataobj);
          this.setState({
            ...this.state,
            councilMembers : this.state.councilMembers.map(member => {
                if(member._id.toString() === dataobj.id.toString()){
                  return { ...member , editing : { ...member.editing , isUpdating : false } }
                }
                return member;
            }) 
        })
       }

      //  if(data.personType === "facultyAndChairperson"){
      //     dataobj.id = data.id;
      //     dataobj.role = data.personType;
      //     if(this.state.authRelatedData.sheeturl_of_faculty_and_chairperson.length > 0){
      //         dataobj.accesstoken = this.state.authRelatedData.accesstoken;
      //     }
      //     await this.props.handleEditFacultyAndChairperson(this.props.society.data.name , this.props.society.data._id , dataobj);
      //  }
    }

    addErrorNotification = (email) => {
        console.log("Called one's");
        store.addNotification({
          title : "Email Does Not Match",
          message: <p>Please login with correct gamil account. Email address of SpreadSheet API for this society is <strong>{email}</strong></p>,
          type: "danger",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animate__animated", "animate__zoomIn"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover : true
          },
          click : false,
          showIcon : true
        });
    }

    
    render(){

      const { location : { search } } = this.props;
      let queryObj = parse(search);  
 
      return(
            <div className="society-setting-manage-members-page">
                <Navbar />
                {
                  this.state.isLoadingData ? (
                      <div className="spinner-div text-center">
                          <Spinner className="custom-modal-spinner" animation="border"/>
                      </div>
                   ) : ( 
                      <div>
                        <ReactNotification /> 
                        <h1 className="manage-members-heading">Manage Members</h1>
                          <p className="description-of-page">Here you can mange details of your council members and society members. 
                              you can edit details of someone and also able to add new person if he/she is joined recently.
                          </p>
                          {
                            ( this.state.authRelatedData.email && this.state.authRelatedData.imgurl && 
                              this.state.authRelatedData.accesstoken && this.state.authRelatedData.name ) &&
                              <div className="user-details-after-login">
                                  <div className="Username-and-image-section d-flex justify-content-center align-items-center">
                                      <div className="Userimage-section mr-2">
                                        <img style={{ width :  "44px" , height : "44px", borderRadius : "22px", objectFit : "cover" }} src={this.state.authRelatedData.imgurl} />
                                      </div>
                                      <div className="username-and-email-section">
                                        <p style={{ margin : "0px", fontSize : "18px", fontWeight : "600" }}>{this.state.authRelatedData.name}</p>
                                        <p style={{ margin : "0px", fontSize : "15px" }}>{this.state.authRelatedData.email}</p>
                                        <p><button className="btn btn-sm btn-danger" id="signout-btn" onClick={this.signOutFunction}>signout</button></p>
                                      </div>
                                  </div>
                              </div>
                          }
                          <div className="connect-to-spreadsheet-using-signin container d-flex justify-content-center align-items-center my-4">
                              <p>To Connect with SpreadSheet for better data import and export. Please sign in with account other than our college account 
                                  <strong> (other than VESIT Email address)</strong>.</p>
                              {
                                  this.state.authRelatedData.accesstoken.length > 0 ? (
                                      this.state.authRelatedData.sheeturl_of_society_members.length > 0 ? (
                                        <button className="btn btn-sm btn-success ml-5">
                                            <i class="fas fa-check-circle mr-1"></i> Connected to spreadsheet
                                        </button> 
                                      ) : (
                                        <div>
                                          {
                                           this.state.isCreatingSheet ? (
                                              <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                      <div className="text-center white-spinner-div">
                                                          <Spinner className="white-small-button-spinner" animation="border"/>
                                                      </div>
                                                  <span className="spinner-text">Creating New SpreadSheet</span>
                                              </button>
                                           ) : (
                                            <button className="btn btn-sm btn-primary blue-button-sm-whites ml-5" onClick={this.handleCreateSpreadSheet}>
                                                  <img src="/images/Google_Sheets_logo.svg" style={{ width : "18px" , marginTop : "-4px", marginRight : "10px"  }} alt="spreadsheet logo" />
                                                  Create New SpreadSheet 
                                            </button>
                                           )   
                                        }
                                        </div>
                                      )
                                  ) : (
                                    this.state.initialisingSheetApi ? (
                                        <button type="submit" className="btn btn-primary btn-md btn-block next-buttons disable-button" disabled>
                                                <div className="text-center white-spinner-div">
                                                    <Spinner className="white-small-button-spinner" animation="border"/>
                                                </div>
                                            <span className="spinner-text">Initialising</span>
                                        </button>
                                        ) : (
                                          <button className="btn btn-md btn-primary blue-button-sm-whites" id="sign" 
                                             onClick={this.signInFunction}><i class="fab fa-google"></i> SignIn With Google </button> 
                                        )   
                                       
                                  )
                              }
                        

                          </div>
                          
                          <div className="society-page-navigation-session manage-members-nav-links">
                              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                  <li className="nav-item">
                                      <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=society-members` } 
                                        className={ `nav-link ${(queryObj.show === "society-members" || Object.keys(queryObj).length === 0) ? "active" : null}` } id="pills-profile-tab" data-toggle="pill" role="tab"  aria-selected="false">Society Members</Link>
                                  </li>
                                  <li className="nav-item">
                                      <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=council-members` } 
                                          className={ `nav-link ${(queryObj.show === "council-members") ? "active" : null}` } id="pills-profile-tab" data-toggle="pill" role="tab"  aria-selected="false">Council Members</Link>
                                  </li>
                                  <li className="nav-item">
                                      <Link to={ `/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data.name : null }/edit/society/${ Object.keys(this.props.society.data).length > 0 ? this.props.society.data._id : null }/managemembers/?show=faculty-and-chairperson` } 
                                          className={ `nav-link ${(queryObj.show === "faculty-and-chairperson") ? "active" : null}` } id="pills-contact-tab" data-toggle="pill" role="tab" aria-selected="false">Faculty & Chairperson</Link>
                                  </li>
                              </ul>
                          </div>

                          {/* Society Member  */}

                          <div className="society-page-navigation-session">
                                {
                                    ( queryObj.show === "society-members" || Object.keys(queryObj).length === 0 ) && 
                                      <div className="Manage-members-society-members-section row">
                                          <div className="col-md-4 members-page-intro-section">
                                              <h1 className="Sub-Heading">Society Members</h1>
                                              <p>Here you can manage all <strong>council members</strong> of your society. <br/>
                                                1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                                2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                                3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                                    then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                              </p>
                                          </div>
                                          <div className="col-md-8">
                                              <div className="sheet-link-button-section d-flex justify-content-between">
                                                  <div className="add-new-member-div">
                                                        <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewSocietyMember}>
                                                          <i class="fas fa-plus"></i> Add New Member
                                                        </button>
                                                  </div>
                                                  <div className="sheet-link-and-syn-section">
                                                    {
                                                      ( this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members ) && (
                                                            <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                              {
                                                                this.state.isSyncingSocietyMembersData ? (
                                                                  <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                          <div className="text-center white-spinner-div">
                                                                              <Spinner className="white-small-button-spinner" animation="border"/>
                                                                          </div>
                                                                      <span className="spinner-text">Syncing</span>
                                                                  </button>
                                                                ) : (
                                                                  <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                                      this.handleDataSync({
                                                                        from : "normal_member"
                                                                      })
                                                                  }}>Sync</button>
                                                                )
                                                                   
                                                              }
                                                              <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                                  <a href={this.state.authRelatedData.sheeturl_of_society_members} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                              </button>
                                                            </div>
                                                      ) 
                                                    }
                                                  </div>
                                              </div>
                                              {
                                                this.state.isNewAddSocietyMember && 
                                                    <div className="new-member-add-div">
                                                      <form onSubmit={(e) => {
                                                        this.handleAddMember(e , {
                                                          from : "society_member"
                                                        })
                                                      }}>
                                                        <div className="row ml-0">
                                                            <div className="form-group col-3 pl-0">
                                                              <input type="text" name="societymember_name" className="form-control insert-member-input-feild" 
                                                                id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.societyMemberData.name}/>
                                                            </div>
                                                            <div className="form-group col-3 pl-0">
                                                              <input type="email" name="societymember_email" className="form-control insert-member-input-feild" 
                                                                id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.societyMemberData.email} />
                                                            </div>
                                                            <div className="form-group col-3 pl-0">
                                                                  <input type="text" className="form-control insert-member-input-feild" 
                                                                      id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Society Member" disabled/>
                                                              </div>
                                                            <div className="form-group col-3 pl-0 d-flex align-items-center justify-content-start">
                                                                {
                                                                  this.state.isAddingSocietyMembers ? (
                                                                      <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                              <div className="text-center white-spinner-div">
                                                                                  <Spinner className="white-small-button-spinner" animation="border"/>
                                                                              </div>
                                                                          <span className="spinner-text">Adding</span>
                                                                      </button>
                                                                  ) : (
                                                                      <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Add </button>
                                                                  )   
                                                                }
                                                                <button className="btn btn-sm btn-danger" onClick={this.addNewSocietyMember}><i class="fas fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                      </form>
                                                  </div>
                                              }
                                              <div className="all-society-members">
                                                <div class="form-group search-div"> 
                                                  <i class="fas fa-search"></i> 
                                                  <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                                </div>
                                                <div className="row ml-0">
                                                  {
                                                    this.state.societyMembers.map(eachmember => (
                                                      !eachmember.editing.isEditing ? ( 
                                                            <div className="col-12 pl-0">
                                                                <div className="each-member-div d-flex justify-content-between align-items-center">
                                                                    <div className="name-and-img-section d-flex justify-content-start">
                                                                      <div className="user-image">
                                                                          <img src="/images/user-img1.jpg" />
                                                                      </div>
                                                                      <div className="d-flex align-items-center">
                                                                          <div className="user-name-and-email-section">
                                                                              <h3>{ eachmember.name }</h3>
                                                                              <p>{ eachmember.email }</p>
                                                                          </div>
                                                                      </div>
                                                                    </div>
                                                                    <div className="role-section">
                                                                      <p>Society Member</p>
                                                                    </div>
                                                                    <div className="edit-and-delete-section">
                                                                      <button className="btn btn-sm btn-warning edit-button" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "society_member",
                                                                            id : eachmember._id
                                                                          })
                                                                      }}><i class="fas fa-pen"></i></button>
                                                                      <button className="btn btn-sm btn-danger" onClick={() => {
                                                                          this.handleRemoveMember({
                                                                              name : eachmember.name,
                                                                              email : eachmember.email,
                                                                              role : "society_member",
                                                                              personType : "society_member"
                                                                          })
                                                                        }}><i class="fas fa-times"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                      ) : (
                                                        <div className="new-member-add-div">
                                                            <form onSubmit={(e) => {
                                                              this.handleEditMemberSubmit(e , {
                                                                  personType : "society_member",
                                                                  id : eachmember._id,
                                                                  name : eachmember.editing.name,
                                                                  email : eachmember.editing.email 
                                                              })
                                                            }}>
                                                              <div className="row ml-0">
                                                                  <div className="form-group col-3 pl-0">
                                                                    <input type="text" name="societymember_name" className="form-control insert-member-input-feild" 
                                                                      id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={(e) => {
                                                                          this.handleEditChange(e , {
                                                                            id : eachmember._id
                                                                          })
                                                                      }} value={eachmember.editing.name}/>
                                                                  </div>
                                                                  <div className="form-group col-3 pl-0">
                                                                    <input type="email" name="societymember_email" className="form-control insert-member-input-feild" 
                                                                      id="memberemail" placeholder="Member's Email" onChange={(e) => {
                                                                        this.handleEditChange(e , {
                                                                          id : eachmember._id
                                                                        })
                                                                    }} value={eachmember.editing.email} />
                                                                  </div>
                                                                  <div className="form-group col-3 pl-0">
                                                                        <input type="text" className="form-control insert-member-input-feild" 
                                                                            id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Society Member" disabled/>
                                                                    </div>
                                                                  <div className="form-group col-3 pl-0 d-flex align-items-center justify-content-start">
                                                                    {
                                                                       eachmember.editing.isUpdating ? (
                                                                        <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                                <div className="text-center white-spinner-div">
                                                                                    <Spinner className="white-small-button-spinner" animation="border"/>
                                                                                </div>
                                                                            <span className="spinner-text">Updating</span>
                                                                        </button>
                                                                       ) : (
                                                                           <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Update </button>
                                                                       )   
                                                                    }
                                                                      
                                                                      <button className="btn btn-sm btn-danger" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "society_member",
                                                                            id : eachmember._id
                                                                          })
                                                                      }}><i class="fas fa-times"></i></button>
                                                                  </div>
                                                              </div>
                                                            </form>
                                                        </div>
                                                      )
                                                    ))
                                                  }  
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                }
                                

                                {/* For Council-Members */}
                                {
                                    queryObj.show === "council-members" &&
                                    <div className="Manage-members-society-members-section row">
                                          <div className="col-md-4 members-page-intro-section">
                                              <h1 className="Sub-Heading">Council Members</h1>
                                              <p>Here you can manage all <strong>council members</strong> of your society. <br/>
                                                1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                                2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                                3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                                    then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                              </p>
                                          </div>
                                          <div className="col-md-8">
                                              <div className="sheet-link-button-section d-flex justify-content-between">
                                                  <div className="add-new-member-div">
                                                        <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewCouncilMember}>
                                                          <i class="fas fa-plus"></i> Add New Member
                                                        </button>
                                                  </div>
                                                  <div className="sheet-link-and-syn-section">
                                                    {
                                                      (this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members) && (
                                                            <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                              {
                                                                this.state.isSyncingCouncilMembersData ? (
                                                                  <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                          <div className="text-center white-spinner-div">
                                                                              <Spinner className="white-small-button-spinner" animation="border"/>
                                                                          </div>
                                                                      <span className="spinner-text">Syncing</span>
                                                                  </button>
                                                                ) : (
                                                                   <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                                      this.handleDataSync({
                                                                        from : "council_member"
                                                                        })
                                                                    }}>Sync</button>
                                                                )
                                                              }
                                                              <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                                  <a href={this.state.authRelatedData.sheeturl_of_council_members} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                              </button>
                                                            </div>
                                                      )
                                                    }
                                                  </div>
                                              </div>
                                              {
                                                this.state.isNewAddCouncilMember && 
                                                    <div className="new-member-add-div">
                                                      <form onSubmit={(e) => {
                                                        this.handleAddMember(e , {
                                                          from : "council_member"
                                                        })
                                                      }}>
                                                        <div className="d-flex flex-row">
                                                              <div className="form-group mr-3 pl-0">
                                                                  <input type="text" name="councilmember_name" className="form-control insert-member-input-feild" 
                                                                    id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.councilMemberData.name}/>
                                                              </div>
                                                              <div className="form-group mr-3 pl-0">
                                                                  <input type="email" name="councilmember_email" className="form-control insert-member-input-feild" 
                                                                  id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.councilMemberData.email}/>
                                                              </div>
                                                              <div className="form-group mr-3 pl-0">
                                                                  <input type="text" className="form-control insert-member-input-feild" 
                                                                      id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Council Member" disabled/>
                                                              </div>
                                                              <div className="form-group mr-3 pl-0">
                                                                  <input type="text" name="councilmember_specificRole" className="form-control insert-member-input-feild" 
                                                                    id="memberspecificrole" placeholder="Specific Role" onChange={this.handleChange} value={this.state.councilMemberData.specificRole} />
                                                              </div>
                                                            <div className="form-group d-flex align-items-center justify-content-start">
                                                               {
                                                                  this.state.isAddingCouncilMembers ? (
                                                                      <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                              <div className="text-center white-spinner-div">
                                                                                  <Spinner className="white-small-button-spinner" animation="border"/>
                                                                              </div>
                                                                          <span className="spinner-text">Adding</span>
                                                                      </button>
                                                                  ) : (
                                                                      <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Add </button>
                                                                  )   
                                                                }
                                                                <button className="btn btn-sm btn-danger" onClick={this.addNewCouncilMember}><i class="fas fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                      </form>
                                                  </div>
                                              }
                                              <div className="all-society-members">
                                                <div class="form-group search-div"> 
                                                  <i class="fas fa-search"></i> 
                                                  <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                                </div>
                                                <div className="row pl-0">
                                                  {
                                                    this.state.councilMembers.map(eachmember => (
                                                      !eachmember.editing.isEditing ? (
                                                          <div className="col-12">
                                                              <div className="each-member-div d-flex justify-content-between align-items-center">
                                                                  <div className="name-and-img-section d-flex justify-content-start">
                                                                    <div className="user-image">
                                                                        <img src="/images/user-img1.jpg" />
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="user-name-and-email-section">
                                                                            <h3>{ eachmember.name }</h3>
                                                                            <p>{ eachmember.email }</p>
                                                                        </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="role-section">
                                                                      <p>{eachmember.role}</p>
                                                                  </div>
                                                                  <div className="role-section">
                                                                      <p>{eachmember.specificrole}</p>
                                                                  </div>
                                                                  <div className="edit-and-delete-section">
                                                                    <button className="btn btn-sm btn-warning edit-button" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "council_member",
                                                                            id : eachmember._id
                                                                          })
                                                                      }} ><i class="fas fa-pen"></i></button>
                                                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                                                        this.handleRemoveMember({
                                                                          name : eachmember.name,
                                                                          email : eachmember.email,
                                                                          role : eachmember.role,
                                                                          specificrole  : eachmember.specificrole,
                                                                          personType : "council_member"
                                                                      })
                                                                    }}><i class="fas fa-times"></i></button>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      ) : (
                                                        <div className="new-member-add-div ml-3">
                                                        <form onSubmit={(e) => {
                                                            this.handleEditMemberSubmit(e , {
                                                                personType : "council_member",
                                                                id : eachmember._id,
                                                                name : eachmember.editing.name,
                                                                email : eachmember.editing.email,
                                                                role : eachmember.editing.role,
                                                                specificrole : eachmember.editing.specificrole 
                                                            }) 
                                                        }}>
                                                          <div className="d-flex flex-row">
                                                                <div className="form-group mr-3 pl-0">
                                                                    <input type="text" name="councilmember_name" className="form-control insert-member-input-feild" 
                                                                      id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={(e) => {
                                                                        this.handleEditChange(e , {
                                                                          id : eachmember._id
                                                                        })
                                                                    }} value={eachmember.editing.name}/>
                                                                </div>
                                                                <div className="form-group mr-3 pl-0">
                                                                    <input type="email" name="councilmember_email" className="form-control insert-member-input-feild" 
                                                                    id="memberemail" placeholder="Member's Email" onChange={(e) => {
                                                                      this.handleEditChange(e , {
                                                                        id : eachmember._id
                                                                      })
                                                                  }} value={eachmember.editing.email} />
                                                                </div>
                                                                <div className="form-group mr-3 pl-0">
                                                                    <input type="text" className="form-control insert-member-input-feild" 
                                                                        id="memberrole" aria-describedby="emailHelp" placeholder="Member's Role" value="Council Member" disabled/>
                                                                </div>
                                                                <div className="form-group mr-3 pl-0">
                                                                    <input type="text" name="councilmember_specificrole" className="form-control insert-member-input-feild" 
                                                                      id="memberspecificrole" placeholder="Specific Role" onChange={(e) => {
                                                                        this.handleEditChange(e , {
                                                                          id : eachmember._id
                                                                        })
                                                                    }} value={eachmember.editing.specificrole} />
                                                                </div>
                                                              <div className="form-group d-flex align-items-center justify-content-start">
                                                                  {
                                                                       eachmember.editing.isUpdating ? (
                                                                        <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                                <div className="text-center white-spinner-div">
                                                                                    <Spinner className="white-small-button-spinner" animation="border"/>
                                                                                </div>
                                                                            <span className="spinner-text">Updating</span>
                                                                        </button>
                                                                       ) : (
                                                                           <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Update </button>
                                                                       )   
                                                                    }
                                                                  <button className="btn btn-sm btn-danger" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "council_member",
                                                                            id : eachmember._id
                                                                          })
                                                                      }} ><i class="fas fa-times"></i></button>
                                                              </div>
                                                          </div>
                                                        </form>
                                                    </div>
                                                      ) 
                                                        
                                                    ))
                                                  }  
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                }

                                {/* For Faculty and Chairperson */}
                                {
                                    queryObj.show === "faculty-and-chairperson" &&
                                    <div className="Manage-members-society-members-section row">
                                          <div className="col-md-4 members-page-intro-section">
                                              <h1 className="Sub-Heading">Faculty And Chairperson</h1>
                                              <p>Here you can manage all <strong>faculty and chairperson</strong> of your society. <br/>
                                                1) You can add members by clicking on <strong>add member button.</strong> <br/> 
                                                2) You can also provoide all members details from <strong>spreadsheet.</strong> <br />
                                                3) To use feature of SpreadSheet, first click on <strong>create spreadsheet</strong> button and after that put your all members details in the spreadsheet
                                                    then click on <strong>sync</strong> to store data of spreadsheet in database and also to get all data on our portal.
                                              </p>
                                          </div>
                                          <div className="col-md-8">
                                              <div className="sheet-link-button-section d-flex justify-content-between">
                                                  {
                                                    ( this.state.faculty.email.length === 0 || this.state.chairperson.email.length === 0 ) &&
                                                        <div className="add-new-member-div">
                                                            <button className="btn btn-sm btn-primary blue-button-sm" onClick={this.addNewFacultyOrChairperson}>
                                                              <i class="fas fa-plus"></i> Add New Member
                                                            </button>
                                                        </div>
                                                  }

                                                  <div className="sheet-link-and-syn-section">
                                                    {
                                                    ( this.state.authRelatedData.email && this.state.authRelatedData.sheeturl_of_society_members ) && (
                                                            <div className="sync-and-spreadsheet-url-div d-flex justify-content-start">
                                                              {
                                                                this.state.isSyncingChairpersonAndFacultyData ? (
                                                                  <button type="submit" className="btn btn-primary btn-md blue-button-sm-whites disable-button mr-2" disabled>
                                                                          <div className="text-center white-spinner-div">
                                                                              <Spinner className="white-small-button-spinner" animation="border"/>
                                                                          </div>
                                                                      <span className="spinner-text">Syncing</span>
                                                                  </button>
                                                                ) : (
                                                                    <button className="btn btn-sm btn-secondary mr-2 blue-button-sm-whites" onClick={() => {
                                                                      this.handleDataSync({
                                                                        from : "faculty_and_chairperson"
                                                                      })
                                                                    }}>Sync</button>
                                                                )
                                                              }
                                                              <button className="btn btn-sm btn-primary blue-button-sm-whites">
                                                                  <a href={this.state.authRelatedData.sheeturl_of_faculty_and_chairperson} target="_blank"><i class="fas fa-file-excel"></i> Spraedsheet Link</a>
                                                              </button>
                                                            </div>
                                                    )
                                                    }
                                                  </div>
                                              </div>
                                              {
                                                this.state.isNewAddFacultyOrChairperson && 
                                                  <div className="new-member-add-div">
                                                      <form onSubmit={(e) => {
                                                        this.handleAddMember(e , {
                                                          from : "faculty_and_chairperson"
                                                        })
                                                      }}>
                                                        <div className="row">
                                                            <div className="form-group col-3">
                                                              <input type="text" name="facultyAndChairpersonData_name" className="form-control insert-member-input-feild" 
                                                                id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.name} />
                                                            </div>
                                                            <div className="form-group col-3">
                                                              <input type="email" name="facultyAndChairpersonData_email" className="form-control insert-member-input-feild" 
                                                                id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.email} />
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <select className="form-control insert-member-input-feild" id="exampleFormControlSelect1" name="facultyAndChairpersonData_personType" 
                                                                    onChange={this.handleChange} value={this.state.facultyAndChairpersonData.personType}>
                                                                    <option value="faculty">Faculty</option>
                                                                    <option value="chairperson">Chairperson</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group d-flex align-items-center justify-content-start">
                                                                <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1">Add</button>
                                                                <button className="btn btn-sm btn-danger" onClick={this.addNewFacultyOrChairperson}><i class="fas fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                      </form>
                                                </div>
                                              }
                                              <div className="all-society-members">
                                                <div class="form-group search-div"> 
                                                  <i class="fas fa-search"></i> 
                                                  <input type="text" name="societymembersearch" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search User by Email or Name" />
                                                </div>
                                                <div className="row">
                                                  {
                                                    this.state.faculty.email.length > 0 && 
                                                      !this.state.faculty.editing.isEditing ? (
                                                      <div className="col-12">
                                                          <div className="each-member-div d-flex justify-content-between align-items-center">
                                                              <div className="name-and-img-section d-flex justify-content-start">
                                                                <div className="user-image">
                                                                    <img src="/images/user-img1.jpg" />
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="user-name-and-email-section">
                                                                        <h3>{ this.state.faculty.name }</h3>
                                                                        <p>{ this.state.faculty.email }</p>
                                                                    </div>
                                                                </div>
                                                              </div>
                                                              <div className="role-section">
                                                                  <p>Faculty</p>
                                                              </div>
                                                              <div className="edit-and-delete-section">
                                                                <button className="btn btn-sm btn-warning edit-button" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "faculty",
                                                                            id : this.state.faculty._id
                                                                          })
                                                                      }} ><i class="fas fa-pen"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={()  => { 
                                                                  this.handleRemoveMember({
                                                                      name :  this.state.faculty.name,
                                                                      email :  this.state.faculty.email,
                                                                      role : "faculty",
                                                                      personType : "faculty_and_chairperson"
                                                                  })
                                                                }}><i class="fas fa-times"></i></button>
                                                              </div>
                                                          </div>
                                                      </div>
                                                    ) : (
                                                      
                                                      <div className="new-member-add-div">
                                                          <form onSubmit={(e) => {
                                                              this.handleEditMemberSubmit(e , {
                                                                  personType : "faculty",
                                                                  id : this.state.faculty._id 
                                                              })
                                                          }}>
                                                            <div className="row">
                                                                <div className="form-group col-3">
                                                                  <input type="text" name="facultyAndChairpersonData_name" className="form-control insert-member-input-feild" 
                                                                    id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.name} />
                                                                </div>
                                                                <div className="form-group col-3">
                                                                  <input type="email" name="facultyAndChairpersonData_email" className="form-control insert-member-input-feild" 
                                                                    id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.email} />
                                                                </div>
                                                                <div className="form-group col-3">
                                                                    <select className="form-control insert-member-input-feild" id="exampleFormControlSelect1" name="facultyAndChairpersonData_personType" 
                                                                        onChange={this.handleChange} value={this.state.facultyAndChairpersonData.personType}>
                                                                        <option value="faculty">Faculty</option>
                                                                        <option value="chairperson">Chairperson</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group d-flex align-items-center justify-content-start">
                                                                    <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Update </button>
                                                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                                                          this.handleEditMember({
                                                                            personType : "faculty",
                                                                            id : this.state.faculty._id
                                                                          })
                                                                      }}><i class="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                          </form>
                                                    </div>
                                                    )
                                                  }


                                                  {
                                                    this.state.chairperson.email.length > 0 && 
                                                      !this.state.chairperson.editing.isEditing ? (
                                                        <div className="col-12">
                                                            <div className="each-member-div d-flex justify-content-between align-items-center">
                                                                <div className="name-and-img-section d-flex justify-content-start">
                                                                  <div className="user-image">
                                                                      <img src="/images/user-img1.jpg" />
                                                                  </div>
                                                                  <div className="d-flex align-items-center">
                                                                      <div className="user-name-and-email-section">
                                                                          <h3>{ this.state.chairperson.name }</h3>
                                                                          <p>{ this.state.chairperson.email }</p>
                                                                      </div>
                                                                  </div>
                                                                </div>
                                                                <div className="role-section">
                                                                    <p>Chairperson</p>
                                                                </div>
                                                                <div className="edit-and-delete-section">
                                                                  <button className="btn btn-sm btn-warning edit-button" onClick={() => {
                                                                        this.handleEditMember({
                                                                          personType : "chairperson",
                                                                          id : this.state.chairperson._id
                                                                        })
                                                                    }}><i class="fas fa-pen"></i></button>
                                                                  <button className="btn btn-sm btn-danger" onClick={()  => { 
                                                                    this.handleRemoveMember({
                                                                        name :  this.state.chairperson.name,
                                                                        email :  this.state.chairperson.email,
                                                                        role : "chairperson",
                                                                        personType : "faculty_and_chairperson"
                                                                    })
                                                                  }}><i class="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                      ) : (
                                                          <div className="new-member-add-div">
                                                              <form onSubmit={(e) => {
                                                                this.handleEditMemberSubmit(e , {
                                                                    personType : "chairperson",
                                                                    id : this.state.chairperson._id 
                                                                })
                                                              }}>
                                                                <div className="row">
                                                                    <div className="form-group col-3">
                                                                      <input type="text" name="facultyAndChairpersonData_name" className="form-control insert-member-input-feild" 
                                                                        id="membername" aria-describedby="emailHelp" placeholder="Member's Name" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.name} />
                                                                    </div>
                                                                    <div className="form-group col-3">
                                                                      <input type="email" name="facultyAndChairpersonData_email" className="form-control insert-member-input-feild" 
                                                                        id="memberemail" placeholder="Member's Email" onChange={this.handleChange} value={this.state.facultyAndChairpersonData.email} />
                                                                    </div>
                                                                    <div className="form-group col-3">
                                                                        <select className="form-control insert-member-input-feild" id="exampleFormControlSelect1" name="facultyAndChairpersonData_personType" 
                                                                            onChange={this.handleChange} value={this.state.facultyAndChairpersonData.personType}>
                                                                            <option value="faculty">Faculty</option>
                                                                            <option value="chairperson">Chairperson</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group d-flex align-items-center justify-content-start">
                                                                        <button type="submit" className="btn btn-sm btn-primary blue-button-sm-whites mr-1"> Update </button>
                                                                        <button className="btn btn-sm btn-danger" onClick={() => {
                                                                              this.handleEditMember({
                                                                                personType : "chairperson",
                                                                                id : this.state.chairperson._id
                                                                              })
                                                                          }}><i class="fas fa-times"></i></button>
                                                                    </div>
                                                                </div>
                                                              </form>
                                                        </div>
                                                      )   
                                                  }  
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                }
                          
                                {/* <button className="btn btn-md btn-primary" onClick={this.handleCreateSpreadSheet}>Create SpreadSheet</button>
                  
                                {
                                    this.state.authRelatedData.accesstoken &&
                                      <div className="spreadsheet-data-section">
                                        <p>{ this.state.name }</p>
                                        <p>{ this.state.email }</p>
                                        <a href={this.state.sheeturl} target="_blank">SpreadSheet Link</a>
                                        <button className="btn btn-sm btn-primary" onClick={this.handleDataSync}>Sync Data from Sheet</button>                      
                                      </div>
                                }
                                
                                <div className="society-page-settings-contents row">
                                  <div className="society-page-settings-left-session col-md-5">
                                        <h3> Manage Society Members </h3>
                                        <p>Here you can update society details , background image of society, Society logo.
                                            Society title is the main title of your society
                                        </p>
                                    </div>
                                    <div className="col-md-7">
                                        {
                                            !this.state.accesstoken &&
                                            <button className="btn btn-sm btn-primary" id="sign">Sign In</button>
                                        }    
                                    </div>
                                </div> */}
                          </div>
                      </div>
                   ) 
                      
               }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    society : state.society
}); 


export default connect(mapStateToProps , { 
  getFileData , 
  createSpreadSheet, 
  dataSync, 
  loadSocietyData , 
  fetchSocietyMembersFullDetails , 
  handleAddSocietyMemeber , 
  handleAddCouncilMemeber , 
  handleAddFacultyAndChairperson, 
  handleRemoveSocietyMember, 
  handleRemoveCouncilMember, 
  handleRemoveFacultyOrChairperson,
  handleEditSocietyMemeber,
  handleEditCouncilMemeber,
  handleAddFacultyAndChairperson 
})(SocietySettingsManageMembers);