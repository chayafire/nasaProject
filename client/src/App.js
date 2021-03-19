import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import React from 'react'
import Login from './component/Login';
import Register from './component/Register';
import TodayImage from "./component/TodayImage";
import NavbarComp from "./component/NavbarComp";
import NewSearch from "./component/NewSearch";
import UserSearches from "./component/UserSearches";


function App() {

  return (


    <div className="App">
      <Router>

        <NavbarComp></NavbarComp>

        <Switch>
          <Route Route exact path='/' component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userSearches" component={UserSearches} />
          <Route path="/todayImage" component={TodayImage} />
          <Route path="/newSearch" component={NewSearch} />



        </Switch>

      </Router>
    </div>

  );
}





export default App;
