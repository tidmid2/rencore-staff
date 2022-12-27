const { 
    fetchUserByEmailDb,
    createUserDb, 

    forgotPassLinkDb,
    forgotPassVerifyDb,
    ResetPassDb,

    fetchDocumentByUserDb,
    createDocumentByUserDb,
    fetchDocumentInsideByUserDb,
    changeCommentDB,

    dailyReportDb,
    dailyReport2Db,
    changeAdminCommentDB,

    dateForConsolidatedReportDb,
    consolidatedReportDb,
    consolidatedReportInsideDb,
    consolidatedReportForXlsDb,

    getUsersDb,
    blockUserDB,
    deleteCardFromUserDB,
    changePassAdminDB,
    changePassAdminCheckDB,
    changeTimeStartAdminDB,
    changeTimeEndAdminDB,

} = require('../db/users-db');

//Auth
const fetchUserByEmail = async (email) => {
    try {
        return await fetchUserByEmailDb(email);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createUser = async (user) => {
    try {
        return await createUserDb(user);
    } catch (e) {
        throw new Error(e.message);
    }
}
//End

//Reset password from user
const forgotPassLink = async (email) => {
    try {
        return await forgotPassLinkDb(email);
    } catch(e) {
        throw new Error(e.message);
    }
}

const forgotPassVerify = async (id) => {
    try {
        return await forgotPassVerifyDb(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const ResetPass = async (password) => {
    try {
        return await ResetPassDb(password);
    } catch(e) {
        throw new Error(e.message);
    }
}
//End

//admin privelegies on Users link
const changePassAdminCheck = async (id) => {
    try {
        return await changePassAdminCheckDB(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const changePassAdmin = async (password,id) => {
    try {
        return await changePassAdminDB(password,id);
    } catch(e) {
        throw new Error(e.message);
    }
}



const blockUser = async (id) => {
    try {
        return await blockUserDB(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const deleteCardFromUser = async (id) => {
    try {
        return await deleteCardFromUserDB(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const getUsers = async () => {
    try {
        return await getUsersDb();
    } catch (e) {
        throw new Error(e.message);
    }
}

const changeTimeStartAdmin = async (id, tmst) => {
    try {
        return await changeTimeStartAdminDB(id, tmst);
    } catch(e) {
        throw new Error(e.message);
    }
}

const changeTimeEndAdmin = async (id, tmst) => {
    try {
        return await changeTimeEndAdminDB(id, tmst);
    } catch(e) {
        throw new Error(e.message);
    }
}

//End

//Users tools
const fetchDocumentByUser = async (user_id) => {
    try {
        return await fetchDocumentByUserDb(user_id);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchDocumentInsideByUser = async (user_id,id_smeny) => {
    try {
        return await fetchDocumentInsideByUserDb(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createDocumentByUser = async (uid) => {
    try {
        return await createDocumentByUserDb(uid);
    } catch (e) {
        throw new Error(e.message);
    }
}

const changeComment = async (uid, comment) => {
    try {
        return await changeCommentDB(uid, comment);
    } catch(e) {
        throw new Error(e.message);
    }
}
//End

//Daily report for Admin
const dailyReport = async (id_smeny) => {
    try {
        return await dailyReportDb(id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const dailyReport2 = async (user_id,id_smeny) => {
    try {
        return await dailyReport2Db(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}
const changeAdminComment = async (uid, comment) => {
    try {
        return await changeAdminCommentDB(uid, comment);
    } catch(e) {
        throw new Error(e.message);
    }
}
//End


//Consolidated Report for Admin
const dateForConsolidatedReport = async (dt1,dt2) => {
    try {
        return await dateForConsolidatedReportDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}

const consolidatedReport = async (dt1,dt2,user) => {
    try {
        return await consolidatedReportDb(dt1,dt2,user);
    } catch (e) {
        throw new Error(e.message);
    }
}

const consolidatedReportInside = async (dt1,dt2) => {
    try {
        return await consolidatedReportInsideDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}

const consolidatedReportForXls = async (dt1,dt2) => {
    try {
        return await consolidatedReportForXlsDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}
//End



module.exports = {  
    fetchUserByEmail,
    createUser, 

    fetchDocumentByUser,
    createDocumentByUser,
    fetchDocumentInsideByUser,
    changeComment,

    dailyReport,
    dailyReport2,
    changeAdminComment,

    dateForConsolidatedReport,
    consolidatedReport,
    consolidatedReportInside,
    consolidatedReportForXls,

    forgotPassLink,
    forgotPassVerify,
    ResetPass,

    getUsers,
    blockUser,
    deleteCardFromUser,
    changePassAdmin,
    changePassAdminCheck,
    changeTimeEndAdmin,
    changeTimeStartAdmin,
}