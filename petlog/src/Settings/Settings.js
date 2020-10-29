import React from "react";
import { uid } from "react-uid";
import SettingsNavbar from "./SettingsNavbar/SettingsNavbar";
import "./Settings.css";

class Settings extends React.Component {
    /* NEED TO MODIFY STATE - we should be getting the "user" information from Login's state*/
    state = {};
  
    //Triggered when a search request is sent
 
  
    render() {
      return (
        <>
          <div>
            <SettingsNavbar />
          </div>
         
        </>
      );
    }
  }
  
  export default Settings;