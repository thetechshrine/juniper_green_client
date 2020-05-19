import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../helpers/Container';
import Modal from '../helpers/Modal';

import CountDown from '../core/CountDown';
import Player from '../core/Player';
import Values from '../core/Values';
import Choices from '../core/Choices';
import ChoiceForm from '../core/ChoiceForm';

import mainActions from '../../store/actions/main';

import { formTypes } from '../../utils/enums';

import { WebSocketContext } from '../providers/WebSocket';

const Run = ({ className, form, player, data, game, play }) => {
  const ws = useContext(WebSocketContext);

  return (
    <div className={className}>
      <Container>
        <header>
          {data.playedValues && <Values values={data.playedValues} />}
        </header>
        <main>
          {game.players
            .filter((p) => player.uuid === p.uuid)
            .map((p) => {
              const myTurn = p.uuid === data.currentPlayer;
              return (
                <section key={p._id}>
                  <Player myTurn={myTurn} player={p} />
                </section>
              );
            })}
          {game.players
            .filter((p) => player.uuid !== p.uuid)
            .map((p) => {
              const myTurn = p.uuid === data.currentPlayer;
              return (
                <section key={p._id}>
                  {data.currentPlayer && myTurn && (
                    <CountDown initialValue={10} />
                  )}
                  <Player myTurn={myTurn} player={p} />
                </section>
              );
            })}
        </main>
        <footer>
          {game.players
            .filter((p) => player.uuid === p.uuid)
            .map((p) => {
              return (
                <section key={p.uuid}>
                  <Choices choices={p.choices.reverse()} />
                </section>
              );
            })}
          {game.players
            .filter((p) => player.uuid !== p.uuid)
            .map((p) => {
              return (
                <section key={p.uuid}>
                  <Choices choices={p.choices.reverse()} />
                </section>
              );
            })}
        </footer>
      </Container>
      <Modal visible={form.visible && form.type === formTypes.CHOICE}>
        <ChoiceForm
          onCancel={() => play({ value: -1, ws })}
          onSubmit={({ value }) => play({ value, ws })}
          data={data}
        />
      </Modal>
    </div>
  );
};

Run.propTypes = {
  form: PropTypes.shape({
    visible: PropTypes.bool,
    type: PropTypes.string,
  }),
  player: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  data: PropTypes.shape({
    currentPlayer: PropTypes.string,
  }),
  game: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  play: PropTypes.func.isRequired,
};

Run.defaultProps = {
  form: {},
  player: {},
  data: {
    playedValues: [],
  },
  game: {
    players: [],
  },
};

const mapStateToProps = (state) => {
  return {
    form: {
      visible: state.form.visible,
      type: state.form.type,
    },
    data: state.main.data,
    player: state.main.player,
    game: state.main.game,
  };
};

const actions = {
  play: mainActions.play,
};

export default styled(connect(mapStateToProps, actions)(Run))`
  > ${Container} {
    > header {
      max-height: 15rem;
      overflow-y: auto;
    }

    > main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 1rem 0;
      position: relative;
      margin-top: 1rem;
      gap: 1rem;

      @media (max-width: 760px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      ::after {
        position: absolute;
        content: '';
        top: 0;
        left: 50%;
        width: 0;
        bottom: 0;
        border-left: 3px dashed #dae1e7;
      }

      > section {
        display: flex;
        align-items: center;
        justify-content: space-around;

        @media (max-width: 760px) {
          flex-direction: column-reverse;
          align-items: center;

          > div {
            margin-bottom: 1rem;
          }
        }
      }
    }

    > footer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin: 3rem 0;
    }
  }
`;
