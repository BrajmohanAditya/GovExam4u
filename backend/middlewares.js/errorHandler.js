const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(statusCode).json({message:message});
}
export default errorHandler;