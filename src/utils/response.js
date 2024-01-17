export const responseSuccess = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    error: null,
    message: message,
    data,
  });
};

export const responseError = (res, statusCode, message, errorMessage) => {
  return res.status(statusCode).json({
    error: errorMessage,
    message: message,
    data: null,
  });
};
