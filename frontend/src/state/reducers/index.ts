import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import soundFileReducer from './soundFileReducer';

const reducers = combineReducers({
  modals: modalReducer,
  soundFiles: soundFileReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
