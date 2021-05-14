import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
// @ts-ignore
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler } from './middleware/error-handler';
import { RouteNotFoundError } from './errors/route-not-found-error';
import { API_ROOT_ENDPOINT } from './utils/constants';
import { soundFileRoutes } from './routes/sound-file-routes';
import { uploadRouter } from './routes/upload-routes';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Security Middleware
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use(`${API_ROOT_ENDPOINT}/sound-files/`, soundFileRoutes);
app.use(`${API_ROOT_ENDPOINT}/upload/`, uploadRouter);

// Route not found
app.all('*', () => {
  throw new RouteNotFoundError();
});

// Attach Global Error Handler
app.use(errorHandler);

export { app };
