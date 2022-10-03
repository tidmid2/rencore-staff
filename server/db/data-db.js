const fetchSecretNrDb = async () => {
    try {
        // const doc = await db.query(`SELECT * FROM documents WHERE user_id = $1`, [user_id]);
        // return doc.rows[0];
        return 42;
    } catch(e) {
        throw new Error(e.message);
    }
}

module.exports = { fetchSecretNrDb }