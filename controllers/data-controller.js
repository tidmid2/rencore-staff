const { fetchSecretNr } = require('../services/data-service');

const getSecretAnswer = async(req, res, next) => {


    const { first_name, last_name } = req.user // passport-session supplies req.user after log-in
    try {
        const nr = await fetchSecretNr();
        res.json(`Hello ${first_name} ${last_name}! Секретный номер от серверной части: ${nr} 😀`);
    } catch {
        return next(err);
    }
}

module.exports = { getSecretAnswer };
