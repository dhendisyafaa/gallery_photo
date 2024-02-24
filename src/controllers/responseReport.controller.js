import {
  findAllResponses,
  findResponseById,
  insertResponseReport,
} from "../services/responseReport.service.js";
import { responseError, responseSuccess } from "../utils/response.js";

export const getAllResponses = async (req, res) => {
  try {
    const responses = await findAllResponses();
    responseSuccess(
      res,
      200,
      "successfully get response report data",
      responses
    );
  } catch (error) {
    responseError(res, 400, `failed to get response report data`, error);
  }
};

export const getResponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await findResponseById(parseInt(id));
    responseSuccess(
      res,
      200,
      `successfully get response data with id ${id}`,
      response
    );
  } catch (error) {
    responseError(res, 400, `failed to get response data`, error);
  }
};

export const createResponseReport = async (req, res) => {
  try {
    const { admin_id, response_message, report_id, change_status } = req.body;
    const data = {
      body: {
        admin_id,
        response_message,
        report_id: parseInt(report_id),
      },
      status: {
        change_status,
      },
    };
    await insertResponseReport(data);
    responseSuccess(res, 201, "successfully create response report issue");
  } catch (error) {
    console.log("🚀 ~ createResponseReport ~ error:", error);
    responseError(res, 400, `failed to generate response report issue`, error);
  }
};
