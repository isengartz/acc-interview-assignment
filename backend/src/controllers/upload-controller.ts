import { NextFunction, Request, Response } from "express";
import path from "path";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { sendSuccessResponse } from "../utils/send-success-response";
import { BadRequestError } from "../errors/bad-request-error";

const s3 = new AWS.S3({
  region: "eu-central-1",
  signatureVersion: "s3v4",
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
  next: NextFunction
) => {
  const { file } = req.body;

  if (!file) {
    throw new BadRequestError("You have to provide a file");
  }

  const key = `${uuidv4()}${path.extname(file)}`;

  // @todo add ALLOWED_FILE_EXT array and check if the ext is included in that array
  // If not throw a BadRequestError

  const url = await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: "audio/*",
    Key: key,
  });

  return sendSuccessResponse(res, { key: key, url: url }, 200);
};
