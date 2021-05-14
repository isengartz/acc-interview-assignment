import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const selectSoundFileState = (state: RootState) => state.soundFiles;

export const selectSoundFiles = createSelector(
  selectSoundFileState,
  (soundFiles) => soundFiles.files,
);

export const selectSelectedSoundFile = createSelector(
  selectSoundFileState,
  (soundFiles) => soundFiles.selectedFile,
);

export const selectSoundFilesLoading = createSelector(
  selectSoundFileState,
  (soundFiles) => soundFiles.loading,
);

export const selectSoundFilesErrors = createSelector(
  selectSoundFileState,
  (soundFiles) => soundFiles.errors,
);
