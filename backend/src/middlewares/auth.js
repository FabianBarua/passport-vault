module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      info: {
        message: 'Unauthorized',
        status: 401
      }
    });
  }
};
