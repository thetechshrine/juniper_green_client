import { GO_TO, BACK } from '../types/navigation';

import routes from '../../utils/routes';

const initState = () => ({
  current: '/',
  prev: '/',
});

export default (state = initState(), action) => {
  switch (action.type) {
    case GO_TO:
      return {
        current: action.payload.current,
        prev: action.payload.prev,
      };
    case BACK:
      return {
        current: state.prev,
        prev: routes.prev[state.prev],
      };
    default:
      return state;
  }
};
