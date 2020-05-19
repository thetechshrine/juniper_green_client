import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import navigationActions from '../../store/actions/navigation';

import Container from '../helpers/Container';
import Box from '../helpers/Box';
import Title from '../helpers/Title';
import Button from '../helpers/Button';

const Welcome = ({ className, goTo }) => {
  return (
    <div className={className}>
      <Container>
        <header>
          <Title size="large" label="Juniper Green" />
        </header>
        {/* <CountDown
          initialValue={init}
          onTimeReached={() => console.log('time reached')}
          ref={data}
        /> */}
        <main className="mt-3">
          <Box>
            <Button
              size="large"
              outline
              onClick={() => goTo({ prev: '/', to: '/game/rules' })}
            >
              Les règles du jeu
            </Button>
            <Button
              size="large"
              outline
              onClick={() => goTo({ prev: '/', to: '/game/mode' })}
            >
              Commencer une partie
            </Button>
          </Box>
        </main>
      </Container>
    </div>
  );
};

Welcome.propTypes = {
  goTo: PropTypes.func.isRequired,
};

const actions = {
  goTo: navigationActions.goTo,
};

export default styled(connect(null, actions)(Welcome))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
