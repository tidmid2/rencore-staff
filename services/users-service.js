const { 
        fetchUserByEmailDb,
        createUserDb, 
        fetchDocumentByUserDb,
        createDocumentByUserDb,
        fetchAllDocumentByUserDb,
        fetchDocumentOPByUserDb,
        adminStage1,
        adminStage2,
    }
    = require('../db/users-db');

const fetchUserByEmail = async (email) => {
    try {
        return await fetchUserByEmailDb(email);
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

const adminStageS1 = async () => {
    try {
        return await adminStage1();
    } catch (e) {
        throw new Error(e.message);
    }
}

const adminStageS2 = async (id_smeny) => {
    try {
        return await adminStage2(id_smeny);
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

const fetchAllDocumentByUser = async () => {
    try {
        return await fetchAllDocumentByUserDb();
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
                }