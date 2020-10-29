import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import "./App.css";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";

class App extends React.Component {
  state = {
    users: [
      { username: "user", password: "user" },
      { username: "admin", password: "admin" }
    ]
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => 
                          (<Login app={this}/>)}/>
          <Route exact path='/signup' render={() => 
                          (<SignUp app={this}/>)}/>
          <Route exact path='/main' render={() => 
                          (<Main app={this}/>)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
