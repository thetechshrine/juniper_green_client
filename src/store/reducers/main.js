import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  VERIFY_PIN_REQUEST,
  VERIFY_PIN_SUCCESS,
  VERIFY_PIN_FAILURE,
  OPPONENT_JOINED,
  GAME_START,
  GAME_DATA_RECEIVED,
  PLAY,
  GAME_END,
  REPLAY,
} from '../types/main';

const initState = () => ({
  game: {
    players: [],
  },
  player: {},
  data: {
    currentPlayer: '',
    currentValue: -1,
    playedValues: [],
  },
});

export default (state = initState(), action) => {
  switch (action.type) {
    case CREATE_GAME_REQUEST:
      return {
        game: state.game,
        player: state.player,
        data: state.data,
        loading: true,
      };
    case CREATE_GAME_SUCCESS:
      return {
        game: action.payload.game,
        player: action.payload.player,
        data: state.data,
      };
    case CREATE_GAME_FAILURE:
      return {
        game: state.game,
        player: state.player,
        data: state.data,
        error: action.payload.error,
      };
    case VERIFY_PIN_REQUEST: {
      return {
        game: state.game,
        player: state.player,
        loading: true,
        data: state.data,
        error: null,
      };
    }
    case VERIFY_PIN_SUCCESS: {
      return {
        game: action.payload.game,
        player: state.player,
        data: state.data,
      };
    }
    case VERIFY_PIN_FAILURE: {
      return {
        game: state.game,
        player: state.player,
        data: state.data,
        error: action.payload.error,
      };
    }
    case OPPONENT_JOINED: {
      return {
        game: state.game,
        player: action.payload.player,
        data: state.data,
      };
    }
    case GAME_START: {
      return state;
    }
    case GAME_DATA_RECEIVED: {
      return {
        game: action.payload.game,
        player: state.player,
        data: action.payload.data,
      };
    }
    case PLAY: {
      return {
        game: state.game,
        player: state.player,
        data: state.data,
      };
    }
    case GAME_END: {
      return {
        game: action.payload.game,
        player: state.player,
        data: state.data,
      };
    }
    case REPLAY: {
      return {
        ...initState(),
      };
    }
    default:
      return state;
  }
};
