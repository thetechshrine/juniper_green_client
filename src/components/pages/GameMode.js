import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import navigationActions from '../../store/actions/navigation';
import mainActions from '../../store/actions/main';

import { gameTypes } from '../../utils/enums';

import Container from '../helpers/Container';
import Box from '../helpers/Box';
import Button from '../helpers/Button';

import { WebSocketContext } from '../providers/WebSocket';

const GameMode = ({ className, goTo, createGame, loading }) => {
  const ws = useContext(WebSocketContext);

  return (
    <div className={className}>
      <Container>
        <main>
          <Box>
            <Button
              size="large"
              outline
              disabled={loading}
              onClick={() => goTo({ prev: '/game/mode', to: '/game/new' })}
            >
              Jouer en 1 vs 1
            </Button>
            <Button
              size="large"
              outline
              disabled={loading}
              onClick={() =>
                createGame({
                  type: gameTypes.PLAYERVSPLAYER,
                  ws,
                  joinComputer: true,
                })
              }
            >
              Jouer contre la machine
            </Button>
          </Box>
        </main>
      </Container>
    </div>
  );
};

GameMode.propTypes = {
  goTo: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

GameMode.defaultProps = {
  loading: false,
};

const mapStateToProps = (state) => {
  return {
    loading: state.main.loading,
  };
};

const actions = {
  goTo: navigationActions.goTo,
  createGame: mainActions.createGame,
};

export default styled(connect(mapStateToProps, actions)(GameMode))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;
