import { SHOW_FORM, HIDE_FORM } from '../types/form';

const initState = () => ({
  type: '',
  visible: false,
});

export default (state = initState(), action) => {
  switch (action.type) {
    case SHOW_FORM: {
      return {
        type: action.payload.type,
        visible: true,
      };
    }
    case HIDE_FORM: {
      return {
        type: '',
        visible: false,
      };
    }
    default:
      return state;
  }
};
