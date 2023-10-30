// this avoids repeating the catct and try blocks
// only for aesthetics and better readability of the main code
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};
