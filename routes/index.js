const { signUpUser, loginUser, logoutUser, documentData } = require('../controllers/auth-controller.js')
const { validateSignUpUser,
        validateLoginUser,
        validateGetDocument } = require('./validation')
const express = require('express');
const { getSecretAnswer } = require('../controllers/data-controller.js');


// Add this function as a middleware to routes requiring authentication
// req.user will contain the current user in the routes
function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(401).json(
            { error: { status: 401, data: 'Not authorized' }}
            );
    }
}

const router = express.Router();

router  
    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/logout', logoutUser)
    .get('/data/secret', checkAuth, getSecretAnswer)
    
router.get('/document/:user_id', validateGetDocument, documentData )

module.exports = router;