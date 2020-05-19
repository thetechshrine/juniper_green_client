import React from 'react';

import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

import history from '../utils/history';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Play from './pages/Play';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/game" component={Home} />
            <Route path="/play" component={Play} />
          </Switch>
        </Router>
      </div>
    </BrowserRouter>
  );
}

export default App;
