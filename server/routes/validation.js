const { check, validationResult } = require("express-validator");
const jwt_decode = require("jwt-decode");
const config = process.env;

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else next();
};

const validateSignUpUser = [
  check("first_name").not().isEmpty().isLength({ max: 100 }),
  check("last_name").not().isEmpty().isLength({ max: 100 }),
  check("password").not().isEmpty().isLength({ min: 6, max: 100 }),
  check("email").not().isEmpty().isEmail().isLength({ max: 100 }),
  validationHandler,
];

const validatePostDocument = [
  check("user_id").not().isEmpty(),
  validationHandler,
];

const validateId = [check("id").not().isEmpty().isInt(), validationHandler];

const validateComment = [
  check("uid").not().isEmpty().isInt(),
  check("comment").not().isEmpty().isLength({ max: 100 }),
  validationHandler,
];

const validateLoginUser = [
  check("password").not().isEmpty().isLength({ max: 100 }),
  check("email").not().isEmpty().isEmail().isLength({ max: 100 }),
  validationHandler,
];

const validateResetPassHandler = [
  check("email").not().isEmpty().isEmail().isLength({ max: 100 }),
  validationHandler,
];

const validateResetPass = [
  check("id").not().isEmpty().isInt(),
  check("password").not().isEmpty().isLength({ max: 100 }),
  validationHandler,
];

const validateChangePass = [
  check("password").not().isEmpty().isLength({ max: 100 }),
  validationHandler,
];

const validateGetDocument = [
  check("user_id").not().isEmpty().isInt(),
  validationHandler,
];

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Для аутентификации требуется токен");
  }
  try {
    // const decoded = jwt.verify(token, config.SESSION_SECRET);
    // req.decoded;

    const decoded = await jwt_decode(token, config.SESSION_SECRET);
    return res.status(200).send(decoded);
  } catch (err) {
    return res.status(401).send("Неверный токен");
  }
  return next();
};

module.exports = {
  validateSignUpUser,
  validateLoginUser,
  validateGetDocument,
  validatePostDocument,
  validateChangePass,
  verifyToken,
  validationHandler,
  validateComment,
  validateId,
  validateResetPassHandler,
  validateResetPass,
};
