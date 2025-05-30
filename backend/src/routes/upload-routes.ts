import express from "express";
import { uploadFile } from "../controllers/upload-controller";

const Router = express.Router();

Router.route("/").post(uploadFile);

export { Router as uploadRouter };
