import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import "./App.css";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import MyBlog from "./MyBlog/MyBlog";
import Settings from "./Settings/Settings";

class App extends React.Component {
  state = {
    users: [
      { username: "user", password: "user" },
      { username: "admin", password: "admin" }
    ]
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => 
                          (<Login app={this}/>)}/>
          <Route exact path='/signup' render={() => 
                          (<SignUp app={this}/>)}/>
          <Route exact path='/main' render={() => 
                          (<Main app={this}/>)}/>
          <Route exact path='/blog' render={() => 
                          (<MyBlog app={this}/>)}/>
          <Route exact path='/settings' render={() => 
                          (<Settings app={this}/>)}/>
        </Switch>
      </BrowserRouter>
     
      </div>
    )
  }
}

export default App;
