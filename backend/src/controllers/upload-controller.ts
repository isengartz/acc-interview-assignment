import { NextFunction, Request, Response } from 'express';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { sendSuccessResponse } from '../utils/send-success-response';

const s3 = new AWS.S3({
  region: process.env.AWS_S3_BUCKET_REGION,
});

/**
 * Generate a preSignedUrl for S3
 * @param req
 * @param res
 * @param next
 */
export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = `${uuidv4()}.jpeg`;

  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: 'audio/*',
    Key: key,
  });

  return sendSuccessResponse(res, { key: key, url: url }, 200);
};
