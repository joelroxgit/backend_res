const { constants } = require("../utils/customError");
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : res.statuscode ? res.statusCode : 500;
  const errorType = Object.keys(constants).find(
    (key) => constants[key] == statusCode
  );

  return res.status(statusCode).json({
    title: errorType,
    message: err.message,
    stackTrace: err.stack, 
  });
};

const errorMandatory = (res) => {
  res.status(400);
  throw new Error("All fields are mandatory")
}

module.exports = { errorHandler, errorMandatory };