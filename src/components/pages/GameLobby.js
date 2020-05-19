import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../helpers/Container';
import Title from '../helpers/Title';

import colors from '../../configs/colors';

const GameLobby = ({ className, game }) => {
  return (
    <div className={className}>
      <Container>
        <Title size="large" label={game.pin} />
        <p>
          Partager ce PIN à un ami et inviter le à jouer contre vous. La partie
          débutera automatiquement dès lors qu'un joueur aura rejoins
        </p>
      </Container>
    </div>
  );
};

GameLobby.propTypes = {
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
};

GameLobby.defaultProps = {
  game: {},
};

const mapStateToProps = (state) => {
  return {
    game: state.main.game,
  };
};

export default styled(connect(mapStateToProps)(GameLobby))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;

  > ${Container} {
    > h1 {
      font-family: 'Montserrat', sans-serif;
    }

    > p {
      font-size: 1.1rem;
      text-align: center;
      color: ${colors.accent};
    }
  }
`;
