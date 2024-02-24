import { Router } from "express";
import {
  createResponseReport,
  getAllResponses,
  getResponseById,
} from "../controllers/responseReport.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const responseReportRoute = Router();

responseReportRoute.get("/responses", authenticate, getAllResponses);
responseReportRoute.get("/response/:id", authenticate, getResponseById);
responseReportRoute.post("/response", authenticate, createResponseReport);

export default responseReportRoute;
