import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 // Link,
  Redirect
} from "react-router-dom";
import HomePage from './../src/pages/HomePage'
import NotFoundPage from './pages/404'
import TherapistMenu from './pages/TherapistMenu'
import ChooseTopic from './pages/ChooseTopic'
import ManageTopic from './pages/ManageTopic';
import Board from './Board/Board';
import ManageSupriseCard from './pages/ManageSupriseCard';
import { Button } from 'react-bootstrap';


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
            <Route path="/ManageSupriseCard" component={ManageSupriseCard} />
            <Route path="/Board" component={Board} />
          </div>
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
