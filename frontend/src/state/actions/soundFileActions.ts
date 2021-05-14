import { SoundFileTypes } from "../action-types/";
import { SoundFileInterface } from "../../util/interfaces/SoundFileInterface";
import { ErrorType } from "../../util/types/ErrorType";

export type SoundFileAction =
  | GetAllSoundFilesStartAction
  | GetAllSoundFilesSuccessAction
  | GetAllSoundFilesErrorAction
  | CreateSoundFileStartAction
  | CreateSoundFileSuccessAction
  | CreateSoundFileErrorAction
  | ClearSoundFileErrorAction
  | DeleteSoundFileStartAction
  | DeleteSoundFileSuccessAction
  | DeleteSoundFileErrorAction
  | SetSelectedSoundFIleAction
  | ClearSelectedSoundFileAction;

// Get Sound File

export interface GetAllSoundFilesStartAction {
  type: SoundFileTypes.GET_ALL_SOUND_FILES_START;
}

export interface GetAllSoundFilesSuccessAction {
  type: SoundFileTypes.GET_ALL_SOUND_FILES_SUCCESS;
  payload: SoundFileInterface[];
}

export interface GetAllSoundFilesErrorAction {
  type: SoundFileTypes.GET_ALL_SOUND_FILES_ERROR;
  payload: ErrorType;
}

// Create Sound File

export interface CreateSoundFileStartAction {
  type: SoundFileTypes.CREATE_SOUND_FILE_START;
}

export interface CreateSoundFileSuccessAction {
  type: SoundFileTypes.CREATE_SOUND_FILE_SUCCESS;
  payload: SoundFileInterface;
}

export interface CreateSoundFileErrorAction {
  type: SoundFileTypes.CREATE_SOUND_FILE_ERROR;
  payload: ErrorType;
}

// Clear Errors

export interface ClearSoundFileErrorAction {
  type: SoundFileTypes.CLEAR_SOUND_FILES_ERRORS;
}

// Delete Sound File

export interface DeleteSoundFileStartAction {
  type: SoundFileTypes.DELETE_SOUND_FILE_START;
}

export interface DeleteSoundFileSuccessAction {
  type: SoundFileTypes.DELETE_SOUND_FILE_SUCCESS;
  payload: string;
}
export interface DeleteSoundFileErrorAction {
  type: SoundFileTypes.DELETE_SOUND_FILE_ERROR;
  payload: ErrorType;
}

// Selected Sound file

export interface SetSelectedSoundFIleAction {
  type: SoundFileTypes.SET_SELECTED_SOUND_FILE;
  payload: string;
}

// Clear Selected Sound File

export interface ClearSelectedSoundFileAction {
  type: SoundFileTypes.CLEAR_SELECTED_SOUND_FILE;
}
