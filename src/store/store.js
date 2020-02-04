import { createStore, applyMiddleware } from 'redux';
import mineReducer from './reducers/reducers';
import thunk from 'redux-thunk';

const store = createStore(mineReducer, applyMiddleware(thunk));

export default store;

