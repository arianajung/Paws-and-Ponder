import React from "react";
import SettingsNavbar from "./SettingsNavbar/SettingsNavbar";
import ProfileSettings from "./subSettings/ProfileSettings";
import CustomizationSettings from "./subSettings/CustomizationSettings"
import NotificationSettings from "./subSettings/NotificationSettings"
import "./Settings.css"

class Settings extends React.Component {
    /* TODO: 
    Initialize this state with current userdata for setting up various settings' initial value
    */
    state = {};
  
    render() {
      return (
        <div className="settings-container">
          <div>
            <SettingsNavbar />
          </div>
          {/* TODO: 
          The following component should be displayed based on 
          which tab is selected from the above Navigation bar. 
          */}
          <div className="subsettings-container">
            <ProfileSettings />
            <CustomizationSettings />
            <NotificationSettings />
          </div>
        </div>
      )
    }
  }
  
  export default Settings;