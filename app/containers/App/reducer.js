import {
  CHANGE_USERNAME,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    repositories: false,
    username: ''
  })
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from github username
      const name = action.name.replace(/@/gi, '');
      return state.setIn(['userData', 'username'], name);
    case LOAD_REPOS:
      return state.set('loading', 'true').setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', state.getIn(['userData', 'username']));
    case LOAD_REPOS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default globalReducer;
