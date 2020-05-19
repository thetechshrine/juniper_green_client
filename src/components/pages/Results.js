import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import mainActions from '../../store/actions/main';

import Container from '../helpers/Container';
import Button from '../helpers/Button';
import Title from '../helpers/Title';

import Table from '../helpers/Table';

const SUCCESS = [
  'https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif',
  'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
  'https://media.giphy.com/media/xDpB3lRInUYla/giphy.gif',
  'https://media.giphy.com/media/zujkOi1kkLRzG/giphy.gif',
  'https://media.giphy.com/media/GBhju13tiVB60/giphy.gif',
  'https://media.giphy.com/media/1bNQxPsCTCafS/giphy.gif',
  'https://media.giphy.com/media/3o6Zt8qDiPE2d3kayI/giphy.gif',
  'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif',
  'https://media.giphy.com/media/DpN931EVIzcEo/giphy.gif',
  'https://media.giphy.com/media/3o7bu57lYhUEFiYDSM/giphy.gif',
];

const FAILURE = [
  'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif',
  'https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif',
  'https://media.giphy.com/media/26DOCE4V9qkiooYU0/giphy.gif',
  'https://media.giphy.com/media/clOQGIoltMUGLqLXKo/giphy.gif',
  'https://media.giphy.com/media/SqkPNNrAP73ySyL38i/giphy.gif',
  'https://media.giphy.com/media/mcH0upG1TeEak/giphy.gif',
  'https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif',
  'https://media.giphy.com/media/EndO2bvE3adMc/giphy.gif',
  'https://media.giphy.com/media/1jARfPtdz7eE0/giphy.gif',
  'https://media.giphy.com/media/28eeDt2VYFK8aQ43S/giphy.gif',
];

const Results = ({ className, player, game, replay }) => {
  const [src, setSrc] = useState('');
  useEffect(() => {}, []);

  const [win, setWin] = useState(false);
  const [rounds, setRounds] = useState(0);
  useEffect(() => {
    const winner = game.players.find((p) => p.winner === true);
    if (winner) {
      // result
      const result = player.uuid === winner.uuid;
      setWin(result);
      const source = result ? SUCCESS : FAILURE;
      setSrc(source[Math.floor(Math.random() * source.length)]);

      // count
      let count = 0;
      game.players.forEach((p) => {
        count += p.choices.length;
      });
      setRounds(count - 1);
    }
  }, [player, game]);

  return (
    <div className={className}>
      <Container>
        <header>
          <Title
            label={
              win
                ? `Bien joué, vous gagnez en ${rounds} tours!`
                : 'Pas de bol !'
            }
          />
          <img src={src} alt="" />
          <Button color="secondary" onClick={() => replay()}>
            Replay
          </Button>
        </header>
        <main>
          <div>
            {game.players
              .filter((p) => player.uuid === p.uuid)
              .map((p) => {
                return <Table key={p._id} player={p} />;
              })}
            {game.players
              .filter((p) => player.uuid !== p.uuid)
              .map((p) => {
                return <Table key={p._id} player={p} />;
              })}
          </div>
        </main>
      </Container>
    </div>
  );
};

Results.propTypes = {
  player: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  game: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string,
      })
    ),
  }),
  replay: PropTypes.func.isRequired,
};

Results.defaultProps = {
  player: {},
  game: {
    players: [],
  },
};

const mapStateToProps = (state) => {
  return {
    player: state.main.player,
    game: state.main.game,
  };
};

const actions = {
  replay: mainActions.replay,
};

const WrappedResults = connect(mapStateToProps, actions)(Results);

export default styled(WrappedResults)`
  margin: 3rem 0;

  > ${Container} {
    > header {
      display: flex;
      flex-direction: column;
      align-items: center;

      > img {
        display: block;
        margin: 2rem auto;
        max-height: 25rem;
        max-width: 100%;
      }
    }

    > main {
      padding: 2rem 0;

      > div {
        display: grid;
        grid-template-columns: 1fr 1fr;

        @media (max-width: 760px) {
          grid-template-columns: none;
          gap: 1rem;
        }
      }
    }
  }
`;
