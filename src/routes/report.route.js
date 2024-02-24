import { Router } from "express";
import {
  createReportIssue,
  getAllReports,
  getReportById,
} from "../controllers/report.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const reportRouter = Router();

reportRouter.get("/reports", authenticate, getAllReports);
reportRouter.get("/report/:id", authenticate, getReportById);
reportRouter.post("/report", authenticate, createReportIssue);

export default reportRouter;
