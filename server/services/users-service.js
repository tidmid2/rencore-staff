const { 
        fetchUserByEmailDb,
        createUserDb, 
        fetchDocumentByUserDb,
        createDocumentByUserDb,
        fetchAllDocumentByUserDb,
        fetchDocumentOPByUserDb,
        adminStage1,
        adminStage2,
        fetchAdminDocumentByUserDb,
        fetchAdminUDocumentByUserDb,
        getUsersDb,
        forgotPassDb,
        forgotPass1Db,
        forgotPass2Db,
        blockUserDB,
        deleteCardFromUserDB,
        changePassAdminDB,
        changePassAdminCheckDB,
    }
    = require('../db/users-db');

const fetchUserByEmail = async (email) => {
    try {
        return await fetchUserByEmailDb(email);
    } catch (e) {
        throw new Error(e.message);
    }
}

const forgotPass = async (email) => {
    try {
        return await forgotPassDb(email);
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

const forgot1Pass = async (id) => {
    try {
        return await forgotPass1Db(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const changePassAdminCheck = async (id) => {
    try {
        return await changePassAdminCheckDB(id);
    } catch(e) {
        throw new Error(e.message);
    }
}

const forgot2Pass = async (password) => {
    try {
        return await forgotPass2Db(password);
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

const getUsers = async () => {
    try {
        return await getUsersDb();
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchDocumentByUser = async (user_id) => {
    try {
        return await fetchDocumentByUserDb(user_id);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchDocumentOPByUser = async (user_id,id_smeny) => {
    try {
        return await fetchDocumentOPByUserDb(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const adminStageS1 = async (id_smeny) => {
    try {
        return await adminStage1(id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const adminStageS2 = async (user_id,id_smeny) => {
    try {
        return await adminStage2(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createDocument = async (uid) => {
    try {
        return await createDocumentByUserDb(uid);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAllDocumentByUser = async (dt1,dt2) => {
    try {
        return await fetchAllDocumentByUserDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAdminDocumentByUser = async (dt1,dt2,user) => {
    try {
        return await fetchAdminDocumentByUserDb(dt1,dt2,user);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAdminUDocumentByUser = async (dt1,dt2) => {
    try {
        return await fetchAdminUDocumentByUserDb(dt1,dt2);
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

module.exports = {  
                    fetchUserByEmail,
                    createUser, 
                    fetchDocumentByUser,
                    createDocument,
                    fetchAllDocumentByUser,
                    fetchDocumentOPByUser,
                    adminStageS1,
                    adminStageS2,
                    fetchAdminDocumentByUser,
                    fetchAdminUDocumentByUser,
                    getUsers,
                    forgotPass,
                    forgot1Pass,
                    forgot2Pass,
                    blockUser,
                    deleteCardFromUser,
                    changePassAdmin,
                    changePassAdminCheck,
                }