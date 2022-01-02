const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      //passing the error to a next middleware to deal with it
      //the next middleware will be "errorHandler" (check app.js to see)
      next(err);
    }
  };
};
module.exports = asyncWrapper;
