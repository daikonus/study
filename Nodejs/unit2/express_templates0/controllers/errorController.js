const httpStatus = require("http-status-codes");

exports.respondNoresourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  // res.send(`${errorCode} | The page does not exist!`);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INRERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

exports.logErrors = (error, req, res, next) => {
  console.log(error.stack);
  next(error);
};
