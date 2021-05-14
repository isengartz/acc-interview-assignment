import { Response } from 'express';

export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
) => {
  return res.status(statusCode).json({
    status: 'success',
    data,
  });
};
