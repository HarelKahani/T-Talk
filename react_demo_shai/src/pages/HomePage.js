import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TherapistMenu from './TherapistMenu'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


class HomePage extends Component {

    render() {
        return (
           
                <div id="home_page">
                    <Link to="">
                        <Button variant="primary" size="lg" id="start_game"> התחל משחק </Button>
                    </Link>
                    <Link to="/TherapistMenu">
                        <Button variant="primary" size="lg" id="connect"> התחבר </Button>
                    </Link>
                </div>
              
        )
    }
}

export default HomePage
