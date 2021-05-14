import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/send-success-response";
import { SoundFile } from "../models/sound-file";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import AWS from "aws-sdk";

export const createSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, url } = req.body;

  const soundFile = await SoundFile.build({ name, url }).save();

  sendSuccessResponse(res, soundFile, 201);
};

export const getSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const soundFile = await SoundFile.findById(req.params.id);

  if (!soundFile) {
    throw new NotFoundError(
      `Sound file wit id: ${req.params.id} does not exists :(`
    );
  }

  sendSuccessResponse(res, soundFile, 200);
};

export const getAllSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const soundFiles = await SoundFile.find({});

  sendSuccessResponse(res, soundFiles, 200);
};

export const deleteSoundFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const soundFile = await SoundFile.findById(id);

  if (!soundFile) {
    throw new BadRequestError(`Sound File with id : ${id} does not exist.`);
  }

  // Remove from s3 bucket
  const s3 = new AWS.S3({
    region: "eu-central-1",
    signatureVersion: "s3v4",
  });

  s3.deleteObject(
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: soundFile.url,
    },
    async (err, data) => {
      if (err) throw new BadRequestError(err.message);
    }
  );

  // remove from db
  await soundFile.remove();

  sendSuccessResponse(res, null, 204);
};
