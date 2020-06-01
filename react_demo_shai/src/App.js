import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomePage from './../src/pages/HomePage'
import NotFoundPage from './pages/404'
import TherapistMenu from './pages/TherapistMenu'
import ChooseTopic from './pages/ChooseTopic'
import ManageTopic from './pages/ManageTopic';
<<<<<<< HEAD
import Board from './Board/Board';
=======
import ManageSupriseCard from './pages/ManageSupriseCard';


>>>>>>> 5c1e8b37e3cf78aa0cdc1a4c945671307b826209

class App extends Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/TherapistMenu" component={TherapistMenu} />
          <div className="admin-panel-container">
            <TherapistMenu />
            <Route path="/ChooseTopic" component={ChooseTopic} />
            <Route path="/ManageTopic" component={ManageTopic} />
<<<<<<< HEAD
            <Route path="/Board" component={Board} />
=======
            <Route path="/ManageSupriseCard" component={ManageSupriseCard} />
            
>>>>>>> 5c1e8b37e3cf78aa0cdc1a4c945671307b826209
          </div>
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
