import { Route, Switch, BrowserRouter } from 'react-router-dom';
import "./App.css";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => 
                        (<Login />)}/>
        <Route exact path='/signup' render={() => 
                        (<SignUp />)}/>
        <Route exact path='/main' render={() => 
                        (<Main />)}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
