const HTTP_STATUS = require('http-status-codes');
const {
  superAdminPermissions,
  adminPermissions,
  taskAdminPermissions
} = require("../utils/permissions")

const checkPermission = (permission) => {
  return function (req, res, next) {
    try {
      if (req.params.id === req.user._id) {
        next();
      } else {
        doCheck(req, permission, next);
      }
    } catch (error) {
      res
        .status(HTTP_STATUS.StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: `${error.message}` });
      throw error;
    }
  };
};

export const doCheck = (req, permission, next) => {
  if (req.user.permissions.indexOf(permission) === -1) {
    throw new Error(
      `you don't have neccessary permission to access this route`
    );
  }
  next();
};

module.exports = checkPermission;
