import { GO_TO, BACK } from '../types/navigation';

import history from '../../utils/history';

const goTo = ({ prev, to }) => {
  history.push(to);

  return {
    type: GO_TO,
    payload: {
      prev,
      current: to,
    },
  };
};

const back = () => (dispatch, getState) => {
  history.push(getState().navigation.prev);

  dispatch({
    type: BACK,
  });
};

export default {
  goTo,
  back,
};
