const { 
    signUpUser, 
    loginUser, 
    logoutUser,

    fetchDocumentInsideByUserController,
    fetchDocumentByUserController,
    createDocumentByUserController,
    changeCommentController,

    dailyReportController,
    dailyReportController2,
    changeAdminCommentController,

    dateForConsolidatedReportController,
    consolidatedReportController,
    consolidatedReportInsideController,
    consolidatedReportForXlsController,

    forgotPassLinkController,
    forgotPassVerifyController,
    ResetPassController,
    
    getUsersController,
    blockUserController,
    deleteCardFromUserController,
    changePassAdminController,
    changeTimeStartAdminController,
    changeTimeEndAdminController,
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
    validateComment,
    verifyToken
} = require('./validation')
const express = require('express');

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

//get all users for admin
router.get('/admin/users', getUsersController)
router.post('/admin/blockuser', validateId, blockUserController)
router.post('/admin/deletecard', validateId, deleteCardFromUserController)
router.post('/admin/tmstart', validateId, changeTimeStartAdminController)
router.post('/admin/tmend', validateId,changeTimeEndAdminController)
router.post('/admin/updatepasswordadmin', validateChangePass, changePassAdminController)

//reset password
router.post('/auth/forgot-pass',validateResetPassHandler, forgotPassLinkController)
router.get("/auth/reset-password/:id/:token",forgotPassVerifyController)
router.post("/auth/reset-password",validateResetPass, ResetPassController)

//user create or fetch documents
router.get('/document/id/:user_id', validateGetDocument, fetchDocumentByUserController ) 
router.post('/document/add', validatePostDocument, createDocumentByUserController )
router.get('/document/id/:user_id/id_smeny/:id_smeny', fetchDocumentInsideByUserController  )
router.post('/document/changes', validateComment, changeCommentController )

//consolidated reports
router.get('/admin/dt1/:dt1/dt2/:dt2',  dateForConsolidatedReportController )
router.get('/admin/user/:user/dt1/:dt1/dt2/:dt2',  consolidatedReportController )
router.get('/admin/admin/dt1/:dt1/dt2/:dt2',  consolidatedReportInsideController ) 
router.get('/admin/xls/dt1/:dt1/dt2/:dt2',  consolidatedReportForXlsController )

//daily report
router.get('/admin/:id_smeny',  dailyReportController )
router.get('/admin/:user_id/:id_smeny',  dailyReportController2 )
router.post('/admin/change', validateComment, changeAdminCommentController )

module.exports = router;