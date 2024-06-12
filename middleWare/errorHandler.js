const errorHandler = (err, req, res, next) => {
  let statusCode = res?.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    msg: err?.message || err?.msg || "Something went wrong",
  });
};

module.exports = errorHandler;
