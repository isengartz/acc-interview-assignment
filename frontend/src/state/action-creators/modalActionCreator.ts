import {
  ShowAudioPlayerModalAction,
  CloseAudioPlayerModalAction,
  ShowCreateAudioFileModalAction,
  CloseCreateAudioFileModalAction,
} from '../actions';
import { ModalTypes } from '../action-types';

export const showAudioPlayerModal = (): ShowAudioPlayerModalAction => {
  return {
    type: ModalTypes.OPEN_AUDIO_PLAYER_MODAL,
  };
};
export const closeAudioPlayerModal = (): CloseAudioPlayerModalAction => {
  return {
    type: ModalTypes.CLOSE_AUDIO_PLAYER_MODAL,
  };
};

export const showCreateAudioFileModal = (): ShowCreateAudioFileModalAction => {
  return {
    type: ModalTypes.OPEN_CREATE_AUDIO_FILE_MODAL,
  };
};

export const closeCreateAudioFileModal =
  (): CloseCreateAudioFileModalAction => {
    return {
      type: ModalTypes.CLOSE_CREATE_AUDIO_FILE_MODAL,
    };
  };
