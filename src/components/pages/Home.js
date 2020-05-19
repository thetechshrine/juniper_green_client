import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../helpers/Navbar';

import GameMode from './GameMode';
import GameRules from './GameRules';
import NewGame from './NewGame';
import GameLobby from './GameLobby';

const Home = ({ className }) => {
  return (
    <div className={className}>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/game"
            render={() => <Redirect to="/game/mode" />}
          />
          <Route path="/game/mode" component={GameMode} />
          <Route path="/game/rules" component={GameRules} />
          <Route path="/game/new" component={NewGame} />
          <Route path="/game/lobby" component={GameLobby} />
        </Switch>
      </main>
    </div>
  );
};

export default styled(Home)``;
