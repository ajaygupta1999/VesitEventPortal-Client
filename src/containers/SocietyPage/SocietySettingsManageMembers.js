import React, { Component } from 'react';
import  { connect } from "react-redux"; 
import Navbar from "../navbar";
import GooglePicker from "react-google-picker";
import { getFileData } from "../../stores/actions/events";


class SimpleButton extends Component {
    render(){
        return(
            <button type="button" className="btn btn-md btn-primary">Upload File</button>
        )
    }
}

class SocietySettingsManageMembers extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            token : ""
        }
    }

    handleFileSelect = async (data) => {
        console.log("File has been selected => ," , data);
        if(data.action === "picked"){
            if(data.docs.length > 0){
              let dataobj = {
                  data : data.docs[0],
                  token : this.state.token
              }
              await this.props.getFileData(dataobj);
            }
        }
    }

   
    render(){
        return(
            <div>
                <Navbar />
                <center><h1>Manage Members of <strong>ISTE VESIT</strong></h1></center>
                <GooglePicker clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
                    developerKey={ process.env.REACT_APP_GOOGLE_API_KEY }
                    scope={['https://www.googleapis.com/auth/drive']}
                    onChange={data => {
                        this.handleFileSelect(data);
                    }}
                    onAuthenticate={token => {
                        this.setState({
                            token
                        })
                    }}
                    onAuthFailed={data => console.log('on auth failed:', data)}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={['application/vnd.google-apps.spreadsheet']}
                    viewId={'DOCS'}>
                   <SimpleButton />
                </GooglePicker>
                <div className="society-page-settings-contents row">
                   <div className="society-page-settings-left-session col-md-5">
                        <h3> Manage Society Members </h3>
                        <p>Here you can update society details , background image of society, Society logo.
                            Society title is the main title of your society
                        </p>
                    </div>
                    <div className="col-md-7">
                        
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


export default connect(mapStateToProps , { getFileData })(SocietySettingsManageMembers);