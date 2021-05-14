import { ModalAction } from '../actions';
import { ModalTypes } from '../action-types';

interface ModalState {
  audioPlayerModal: boolean;
  addAudioFileModal: boolean;
}

const initialState: ModalState = {
  audioPlayerModal: false,
  addAudioFileModal: false,
};

const reducer = (
  state: ModalState = initialState,
  action: ModalAction,
): ModalState => {
  switch (action.type) {
    case ModalTypes.OPEN_AUDIO_PLAYER_MODAL:
      return { ...state, audioPlayerModal: true };
    case ModalTypes.CLOSE_AUDIO_PLAYER_MODAL:
      return { ...state, audioPlayerModal: false };
    case ModalTypes.OPEN_CREATE_AUDIO_FILE_MODAL:
      return { ...state, addAudioFileModal: true };
    case ModalTypes.CLOSE_CREATE_AUDIO_FILE_MODAL:
      return { ...state, addAudioFileModal: false };

    default:
      return state;
  }
};

export default reducer;
