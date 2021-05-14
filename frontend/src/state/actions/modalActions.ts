import { ModalTypes } from '../action-types/';

export type ModalAction =
  | ShowAudioPlayerModalAction
  | CloseAudioPlayerModalAction
  | ShowCreateAudioFileModalAction
  | CloseCreateAudioFileModalAction;

export interface ShowAudioPlayerModalAction {
  type: ModalTypes.OPEN_AUDIO_PLAYER_MODAL;
}
export interface CloseAudioPlayerModalAction {
  type: ModalTypes.CLOSE_AUDIO_PLAYER_MODAL;
}

export interface ShowCreateAudioFileModalAction {
  type: ModalTypes.OPEN_CREATE_AUDIO_FILE_MODAL;
}

export interface CloseCreateAudioFileModalAction {
  type: ModalTypes.CLOSE_CREATE_AUDIO_FILE_MODAL;
}
