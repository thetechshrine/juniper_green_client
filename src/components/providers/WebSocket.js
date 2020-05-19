import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

import mainActions from '../../store/actions/main';

const WebSocketContext = createContext(null);
export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();

  const joinCreator = ({ pin, playerId, joinComputer }) => {
    socket.emit('join creator', { pin, playerId, joinComputer });
  };

  const joinOpponent = ({ pin, type }) => {
    socket.emit('join opponent', { pin, type });
  };

  const play = ({ pin, choice, playerId }) => {
    socket.emit('play', { pin, choice, playerId });
  };

  if (!socket) {
    try {
      socket = io.connect(process.env.REACT_APP_WS_BASE_URL, {
        transports: ['websocket'],
      });
      socket.on('connect', () => {
        socket.on('opponent joined', ({ player }) => {
          dispatch(mainActions.opponentJoined({ player }));
        });

        socket.on(
          'game data',
          ({ currentValue, currentPlayer, game, playedValues }) => {
            dispatch(
              mainActions.gameDataReceived({
                game,
                currentPlayer,
                currentValue,
                playedValues,
              })
            );
          }
        );

        socket.on('game start', () => {
          dispatch(mainActions.gameStart());
        });

        socket.on('game ended', ({ game }) => {
          dispatch(mainActions.gameEnd({ game }));
        });
      });

      ws = {
        socket,
        joinCreator,
        joinOpponent,
        play,
      };
    } catch (error) {}
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
