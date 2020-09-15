import React from 'react'

// Pages
import Home from '../../Pages/Home/Home';
import Saved from '../../Pages/Saved/Saved';

// Router
import {
    Switch,
    Route
} from 'react-router-dom';
import {
    HOME,
    SAVED,
    LANDING
} from '../../Config/Route/Routes';

const routes = (
    <div>
        <Switch>
            <Route path={HOME} ><Home /></Route>
            <Route path={SAVED} ><Saved /></Route>
            <Route path={LANDING}><Home /></Route>
        </Switch>
    </div>
);

export default routes