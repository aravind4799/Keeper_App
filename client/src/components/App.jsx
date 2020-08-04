import React, { useState } from "react";
import Notes from "./Notes";
import Login from "./Login";
import Signuphead from "./Signuphead";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


export default function App() {
  const initialstate = {
    username:"",
    password:"",
    confirm_password:"",
    username_error:"",
    password_error:"",
    confirm_password_error:"",
    data_from_db:[]
}
  const[user_details,change_userdetails]=useState(initialstate);
  
  function getusername(data){    
     change_userdetails(data)
  }

  return(
    <div>
    <Router>
    <Switch>
    <Route path="/" exact>
            <Signuphead/>
            <Login senddata={getusername}/>
    </Route>
    <Route path="/note">
      <Notes user_details={user_details} />
    </Route>
    </Switch>
    </Router>
    </div>
  );

  

 
}