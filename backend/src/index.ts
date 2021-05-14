import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('WS_S3_BUCKET_NAME must be defined');
  }
  if (!process.env.AWS_S3_BUCKET_REGION) {
    throw new Error('AWS_S3_BUCKET_REGION must be defined');
  }

  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY must be defined');
  }

  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID must be defined');
  }

  try {
    // Init mongoose instance
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  app.listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port 3001!');
  });
};
start();
