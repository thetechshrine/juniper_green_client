import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  VERIFY_PIN_REQUEST,
  VERIFY_PIN_SUCCESS,
  VERIFY_PIN_FAILURE,
  OPPONENT_JOINED,
  GAME_DATA_RECEIVED,
  GAME_START,
  PLAY,
  GAME_END,
  REPLAY,
} from '../types/main';

import mainService from '../services/main';

import formActions from '../actions/form';

import history from '../../utils/history';
import {
  gameTypes,
  playerTypes,
  formTypes,
  choiceTypes,
} from '../../utils/enums';

const createGame = ({ type, ws, joinComputer = false }) => (dispatch) => {
  dispatch({ type: CREATE_GAME_REQUEST });

  mainService
    .createGame(type)
    .then((response) => {
      const { data } = response;
      if (type === gameTypes.PLAYERVSPLAYER) {
        history.push('/game/lobby');
        if (ws) {
          ws.joinCreator({
            pin: data.game.pin,
            playerId: data.player._id,
            joinComputer,
          });
        }
      }

      dispatch({
        type: CREATE_GAME_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CREATE_GAME_FAILURE,
        payload: {
          error: error.message,
        },
      });
    });
};

const verifyPin = ({ pin, ws }) => (dispatch) => {
  dispatch({ type: VERIFY_PIN_REQUEST });

  mainService
    .verifyPin(pin)
    .then((response) => {
      const { data } = response;
      dispatch({ type: VERIFY_PIN_SUCCESS, payload: { game: data } });
      dispatch(formActions.hideForm());

      console.log(ws);
      if (ws) {
        ws.joinOpponent({ pin: data.pin, type: playerTypes.HUMAN });
      }
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        if (data) {
          dispatch({
            type: VERIFY_PIN_FAILURE,
            payload: {
              error: data.message,
            },
          });
        }
      } else {
        dispatch({
          type: VERIFY_PIN_FAILURE,
          payload: {
            error: error.message,
          },
        });
      }
    });
};

const opponentJoined = ({ player }) => {
  return {
    type: OPPONENT_JOINED,
    payload: { player },
  };
};

const gameStart = () => {
  history.push('/play/run');
  return {
    type: GAME_START,
  };
};

const gameDataReceived = ({ game, ...data }) => (dispatch, getState) => {
  const { currentPlayer } = data;
  if (currentPlayer) {
    const player = getState().main.player;
    if (player.uuid === currentPlayer) {
      dispatch(formActions.showForm({ type: formTypes.CHOICE }));
    }
  }

  dispatch({
    type: GAME_DATA_RECEIVED,
    payload: {
      game,
      data,
    },
  });
};

const play = ({ value, ws }) => (dispatch, getState) => {
  const { data, game, player } = getState().main;
  const type =
    value !== -1 && data.currentValue !== -1
      ? data.currentValue % value === 0
        ? choiceTypes.DIVIDER
        : choiceTypes.MULTIPLE
      : choiceTypes.INITIAL;
  const choice = {
    current: data.currentValue,
    type,
    value,
  };

  dispatch(formActions.hideForm());
  dispatch({ type: PLAY, payload: { choice } });
  if (ws) {
    ws.play({ pin: game.pin, playerId: player._id, choice });
  }
};

const gameEnd = ({ game }) => {
  history.push('/play/results');
  return {
    type: GAME_END,
    payload: { game },
  };
};

const replay = () => {
  history.push('/');
  return {
    type: REPLAY,
  };
};

export default {
  createGame,
  verifyPin,
  opponentJoined,
  gameDataReceived,
  gameStart,
  play,
  gameEnd,
  replay,
};
