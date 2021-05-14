import { Dispatch } from "redux";
import { AppThunk } from "../../util/types/AppThunk";
import { Action, SoundFileAction } from "../actions";
import { ModalTypes, SoundFileTypes } from "../action-types";
import { handleAxiosErrorMessage } from "../../util/handleAxiosErrorMessage";
import axios from "axios";
import { API_BASE_URL } from "../../util/constants";

export const createSoundFile = (data: {
  name: string;
  file: File | undefined;
}): AppThunk => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: SoundFileTypes.CREATE_SOUND_FILE_START });
    try {
      const { file, name } = data;

      // Get the PreSignedUrl
      const {
        data: {
          data: { key, url },
        },
      } = await axios.post(`${API_BASE_URL}/upload`, {
        file: file?.name,
      });

      // Upload the file to S3 bucket
      await axios.put(url, file, {
        headers: {
          "Content-Type": file?.type,
        },
      });

      // Create the actual sound-file using s3 url
      const response = await axios.post(`${API_BASE_URL}/sound-files`, {
        name,
        url: key,
      });

      dispatch({
        type: SoundFileTypes.CREATE_SOUND_FILE_SUCCESS,
        payload: response.data.data,
      });

      // Close Modal
      dispatch({
        type: ModalTypes.CLOSE_CREATE_AUDIO_FILE_MODAL,
      });
    } catch (e) {
      dispatch({
        type: SoundFileTypes.CREATE_SOUND_FILE_ERROR,
        payload: handleAxiosErrorMessage(e),
      });
    }
  };
};

export const getAllSoundFiles = (): AppThunk => {
  return async (dispatch: Dispatch<SoundFileAction>) => {
    dispatch({ type: SoundFileTypes.GET_ALL_SOUND_FILES_START });
    try {
      const response = await axios.get(`${API_BASE_URL}/sound-files`);

      dispatch({
        type: SoundFileTypes.GET_ALL_SOUND_FILES_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      dispatch({
        type: SoundFileTypes.GET_ALL_SOUND_FILES_ERROR,
        payload: handleAxiosErrorMessage(e),
      });
    }
  };
};

export const clearSoundFileErrors = () => ({
  type: SoundFileTypes.CLEAR_SOUND_FILES_ERRORS,
});

export const deleteSoundFile = (id: string): AppThunk => {
  return async (dispatch: Dispatch<SoundFileAction>) => {
    dispatch({ type: SoundFileTypes.DELETE_SOUND_FILE_START });
    try {
      await axios.delete(`${API_BASE_URL}/sound-files/${id}`);

      dispatch({
        type: SoundFileTypes.DELETE_SOUND_FILE_SUCCESS,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: SoundFileTypes.DELETE_SOUND_FILE_ERROR,
        payload: handleAxiosErrorMessage(e),
      });
    }
  };
};

export const setSelectedSoundFile = (id: string) => ({
  type: SoundFileTypes.SET_SELECTED_SOUND_FILE,
  payload: id,
});

export const clearSelectedSoundFile = () => ({
  type: SoundFileTypes.CLEAR_SELECTED_SOUND_FILE,
});
