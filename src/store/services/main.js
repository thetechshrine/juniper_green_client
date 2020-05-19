import httpClient from '../../api/http-client';

const createGame = (type) => {
  return httpClient.post('/games', { type });
};

const verifyPin = (pin) => {
  return httpClient.get('/games/pin-verification', {
    params: {
      pin: pin.toUpperCase(),
    },
  });
};

export default {
  createGame,
  verifyPin,
};
