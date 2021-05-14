import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const selectModalState = (state: RootState) => state.modals;

export const selectAddAudioFileModal = createSelector(
  selectModalState,
  (modals) => modals.addAudioFileModal,
);

export const selectAudioPlayerModal = createSelector(
  selectModalState,
  (modals) => modals.audioPlayerModal,
);
