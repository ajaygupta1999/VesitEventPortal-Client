import React, { Component } from 'react';
import Home from "./Home";
import '../App.css';
import { Route, Switch } from 'react-router';
import ClassAndSociety from './UserForm/ClassAndSociety';
import EventDetailsForm from './Event/EventDetailsForm';
import GuestAndSponsorsForm from "./Event/GuestAndSponsorsForm";
import SocietyPage from "./SocietyPage/SocietyPage";
import UserPage from './User/UserPage';
import EventPage from "./EventPage/Eventpage";
import RegistrationFormDetails from "./Event/RegistrationFormDetails";
import EventForm from './Event/EventForm';
import EditPage from './User/EditProfile';
import SocietySettings from "./SocietyPage/SocietySettings";
import SocietySettingsManageAdmins from "./SocietyPage/SocietySettingsManageAdmins";
import SocietySettingsManageMembers from "./SocietyPage/SocietySettingsManageMembers";


class App extends Component {
     render(){
       return(
          <Switch>
             <Route exact path="/" component={Home} />
             <Route exact path="/home" component={Home} />
             <Route exact path="/user/:userid/create/classandsociety" component={ClassAndSociety} />
             <Route exact path="/user/:userid/add/eventdetails" component={EventDetailsForm} />
             <Route exact path="/user/:userid/add/:eventid/guestandsponsor" component={GuestAndSponsorsForm} />
             <Route exact path="/user/:userid/add/:eventid/formdetails" component={RegistrationFormDetails} />
             <Route exact path="/user/:userid/add/:eventid/formdetails/createnewform" component={EventForm} />
             <Route exact path="/home/createdevent/user/:userid/event/:eventid" component={Home} />
             <Route exact path="/user/:userid/edit/profile" component={EditPage}></Route>
             <Route exact path="/society/:societyname/edit/society/:societyid" component={SocietySettings}></Route>
             <Route exact path="/society/:societyname/edit/society/:societyid/manageadmins" component={SocietySettingsManageAdmins}></Route>
             <Route exact path="/society/:societyname/edit/society/:societyid/managemembers" component={SocietySettingsManageMembers}></Route>
             <Route exact path="/society/:name" component={SocietyPage} />
             <Route exact path="/user/:userid/profile" component={UserPage} />
             <Route exact path="/event/:eventid" component={EventPage} />
          </Switch>
       );
     }
}


export default App;
