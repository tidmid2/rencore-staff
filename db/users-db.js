const db = require('../config/db.js');

const fetchUserByEmailDb = async (email) => {
    try {
        const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

const fetchDocumentByUserDb = async (user_id) => {
    try {
        const res = await db.query(`SELECT * FROM documents WHERE user_id = $1 order by dt desc`, [user_id]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const createDocumentByUserDb = async ({user_id, dt, time, comment,status}) => {
    const text = `INSERT INTO documents(user_id, dt, time, comment,status)
                  VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [user_id, dt, time, comment,status];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

const fetchAllDocumentByUserDb = async () => {
    try {
        const res = await db.query(`select d.uid as uid,concat(u.first_name,' ',u.last_name) as user_id,d.dt as dt,d.time as time,d.comment as comment,d.status as status
        from documents d inner join users u on d.user_id = u.id
        order by dt desc`);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const createUserDb = async ({email, first_name, last_name, pwd_hash}) => {
    const text = `INSERT INTO users(email, first_name, last_name, pwd_hash)
                  VALUES($1, $2, $3, $4) RETURNING id`;
    const values = [email, first_name, last_name, pwd_hash];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

module.exports = {  
                    fetchUserByEmailDb,
                    createUserDb, 
                    fetchDocumentByUserDb,
                    createDocumentByUserDb,
                    fetchAllDocumentByUserDb,
                }