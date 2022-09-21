const { check, validationResult } = require('express-validator')

// Function that validates and sends back response
const validationHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else next();
}

const validateSignUpUser = [
    check('first_name').not().isEmpty().isLength({max: 100}),
    check('last_name').not().isEmpty().isLength({max: 100}),
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validatePostDocument = [
    check('user_id').not().isEmpty(),
    validationHandler
]

const validateLoginUser = [
    check('password').not().isEmpty().isLength({max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateGetDocument = [
    check('user_id').not().isEmpty().isInt(),
    validationHandler
]

module.exports = {
    validateSignUpUser,
    validateLoginUser,
    validateGetDocument,
    validatePostDocument,
}
