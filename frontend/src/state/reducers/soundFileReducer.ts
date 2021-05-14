import { SoundFileAction } from "../actions";
import { SoundFileTypes } from "../action-types";
import { SoundFileInterface } from "../../util/interfaces/SoundFileInterface";
import { ErrorType } from "../../util/types/ErrorType";

interface SoundFileState {
  files: SoundFileInterface[];
  selectedFile: SoundFileInterface | undefined;
  loading: boolean;
  errors: ErrorType;
}

const initialState: SoundFileState = {
  files: [],
  selectedFile: undefined,
  loading: false,
  errors: [],
};

const reducer = (
  state: SoundFileState = initialState,
  action: SoundFileAction
): SoundFileState => {
  switch (action.type) {
    case SoundFileTypes.GET_ALL_SOUND_FILES_START:
      return { ...state, loading: true };
    case SoundFileTypes.GET_ALL_SOUND_FILES_SUCCESS:
      return { ...state, loading: false, files: action.payload };
    case SoundFileTypes.GET_ALL_SOUND_FILES_ERROR:
      return { ...state, loading: false, errors: [] };
    case SoundFileTypes.CREATE_SOUND_FILE_START:
      return { ...state, loading: true, errors: [] };
    case SoundFileTypes.CREATE_SOUND_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        files: [...state.files, action.payload],
      };
    case SoundFileTypes.CREATE_SOUND_FILE_ERROR:
      return { ...state, loading: false, errors: action.payload };
    case SoundFileTypes.CLEAR_SOUND_FILES_ERRORS:
      return { ...state, errors: [] };

    case SoundFileTypes.DELETE_SOUND_FILE_START:
      return { ...state, loading: true, errors: [] };
    case SoundFileTypes.DELETE_SOUND_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        files: state.files.filter((file) => file.id !== action.payload),
      };
    case SoundFileTypes.DELETE_SOUND_FILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case SoundFileTypes.SET_SELECTED_SOUND_FILE:
      const index = state.files.findIndex((file) => file.id === action.payload);

      return {
        ...state,
        selectedFile: state.files[index],
      };

    case SoundFileTypes.CLEAR_SELECTED_SOUND_FILE:
      return {
        ...state,
        selectedFile: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
