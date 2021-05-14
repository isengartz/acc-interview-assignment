import { NextFunction, Request, Response } from 'express';
import { sendSuccessResponse } from '../utils/send-success-response';
import { SoundFile } from '../models/sound-file';
import { NotFoundError } from '../errors/not-found-error';

export const createSoundFile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  sendSuccessResponse(res, 'test', 201);
};

export const getSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const soundFile = await SoundFile.findById(req.params.id);

  if (!soundFile) {
    throw new NotFoundError(
      `Sound file wit id: ${req.params.id} does not exists :(`,
    );
  }

  sendSuccessResponse(res, soundFile, 200);
};

export const getAllSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const soundFiles = await SoundFile.find({});

  sendSuccessResponse(res, soundFiles, 200);
};

export const deleteSoundFile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  sendSuccessResponse(res, 'test', 204);
};
