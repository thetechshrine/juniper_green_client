import { combineReducers } from 'redux';

import mainReducer from '../reducers/main';
import navigationReducer from '../reducers/navigation';
import formReducer from '../reducers/form';

export default combineReducers({
  main: mainReducer,
  navigation: navigationReducer,
  form: formReducer,
});
