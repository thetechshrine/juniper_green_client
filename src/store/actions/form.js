import { SHOW_FORM, HIDE_FORM } from '../types/form';

const showForm = ({ type }) => ({
  type: SHOW_FORM,
  payload: { type },
});

const hideForm = () => ({
  type: HIDE_FORM,
});

export default {
  showForm,
  hideForm,
};
