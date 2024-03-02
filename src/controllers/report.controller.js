import {
  findAllReport,
  findReportById,
  generateReportIssue,
} from "../services/report.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await findAllReport();
    responseSuccess(res, 200, "successfully get report data", reports);
  } catch (error) {
    responseError(res, 400, `failed to get report data`, error);
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await findReportById(parseInt(id));
    responseSuccess(
      res,
      200,
      `successfully get report data with id ${id}`,
      report
    );
  } catch (error) {
    responseError(res, 400, `failed to get report data`, error);
  }
};

export const createReportIssue = async (req, res) => {
  try {
    await generateReportIssue(req.body);
    responseSuccess(res, 201, "successfully generate report issue");
  } catch (error) {
    responseError(res, 400, `failed to generate report issue`, error);
  }
};
