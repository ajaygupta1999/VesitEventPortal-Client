import React, { Component } from 'react';
import Home from "./Home";
import PersonalDetailsForm from "./UserForm/PersonalDetailsForm";
import '../App.css';
import { Route, Switch } from 'react-router';
import ClassAndSociety from './UserForm/ClassAndSociety';
import EventDetailsForm from './Event/EventDetailsForm';
import GuestAndSponsorsForm from "./Event/GuestAndSponsorsForm";
import SocietyPage from "./SocietyPage/SocietyPage";
import UserPage from './User/UserPage';


class App extends Component {
     render(){
       return(
          <Switch>
             <Route exact path="/" component={Home} />
             <Route exact path="/home" component={Home} />
             <Route exact path="/user/:id/create/classandsociety" component={ClassAndSociety} />
             <Route exact path="/user/:id/create/personaldetails" component={PersonalDetailsForm} />
             <Route exact path="/user/:id/add/eventdetails" component={EventDetailsForm} />
             <Route exact path="/user/:id/add/:eventid/guestandsponsor" component={GuestAndSponsorsForm} />
             <Route exact path="/society/:name" component={SocietyPage} />
             <Route exact path="/user/:id/profile" component={UserPage} />
          </Switch>
       );
     }
}


export default App;
