import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import styled from 'styled-components';

import Navbar from '../helpers/Navbar';

import Run from './Run';
import Results from './Results';

const Play = ({ className }) => {
  return (
    <div className={className}>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/play"
            render={() => <Redirect to="/play/run" />}
          />
          <Route path="/play/run" component={Run} />
          <Route path="/play/results" component={Results} />
        </Switch>
      </main>
    </div>
  );
};

export default styled(Play)``;
