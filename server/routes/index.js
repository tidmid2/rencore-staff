const { 
        signUpUser, 
        loginUser, 
        logoutUser, 
        documentData,
        createDocumentByUser ,
        fetchDocument,
        fetchDocuments,
        adminStag1,
        adminStag2,
        fetchAdminDocument,
        fetchAdminUDocument,
        fetchUsers,
        fetchPass,
        fetch1Pass,
        fetch2Pass,
        changePassAdminController,
        blockedUser,
        deleteCardUser
    } = require('../controllers/auth-controller.js')
const { 
        validateSignUpUser,
        validateLoginUser,
        validateGetDocument,
        validatePostDocument,
        validateResetPass,
        validateResetPassHandler,
        validateChangePass,
        validateId,
        verifyToken
    } = require('./validation')
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
//auth and authorize
router.post('/auth', verifyToken)
router.post('/auth/signup', validateSignUpUser, signUpUser)
router.post('/auth/login', validateLoginUser, loginUser)
router.post('/auth/logout', logoutUser)

//nothing
router.get('/data/secret', checkAuth, getSecretAnswer)

//get all users for admin
router.get('/admin/users', fetchUsers)
router.post('/admin/blockuser', validateId, blockedUser)
router.post('/admin/deletecard', validateId, deleteCardUser)
router.post('/admin/updatepasswordadmin', validateChangePass, changePassAdminController)

//reset password
router.post('/auth/forgot-pass',validateResetPassHandler, fetchPass)
router.get("/auth/reset-password/:id/:token",fetch1Pass)
router.post("/auth/reset-password",validateResetPass, fetch2Pass)

//user create or fetch documents
router.get('/document/id/:user_id', validateGetDocument, documentData )
router.post('/document/add', validatePostDocument, createDocumentByUser )
router.get('/document/id/:user_id/id_smeny/:id_smeny',fetchDocuments  )

//admin fetch documents
router.get('/admin/dt1/:dt1/dt2/:dt2',  fetchDocument )
router.get('/admin/user/:user/dt1/:dt1/dt2/:dt2',  fetchAdminDocument )
router.get('/admin/admin/dt1/:dt1/dt2/:dt2',  fetchAdminUDocument )

router.get('/admin/:id_smeny',  adminStag1 )
router.get('/admin/:user_id/:id_smeny',  adminStag2 )
// router.get('/admin/all',  fetchDocument )

module.exports = router;