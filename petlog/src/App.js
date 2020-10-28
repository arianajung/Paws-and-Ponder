import { Route, Switch, BrowserRouter } from 'react-router-dom';
import "./App.css";

import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => 
                        (<Login />)}/>
        <Route exact path='/signup' render={() => 
                        (<SignUp />)}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
