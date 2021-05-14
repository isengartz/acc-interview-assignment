import express from 'express';
import {
  createSoundFile,
  deleteSoundFile,
  getAllSoundFile,
  getSoundFile,
} from '../controllers/sound-file-controller';

const Router = express.Router();

Router.route('/:id').get(getSoundFile).delete(deleteSoundFile);

Router.route('/').get(getAllSoundFile).post(createSoundFile);

export { Router as soundFileRoutes };
