const joi = require('joi');
const ApiError = require('../utils/ApiError');
const validate = (schema) => (req, res, next) => {
    const keys = Object.keys(schema);
    const object = keys.reduce((obj, key) => {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
            // eslint-disable-next-line security/detect-object-injection
            obj[key] = req[key];
        }
        return obj;
    }, {});
    // eslint-disable-next-line no-unused-vars
    const { value, error } = joi.compile(schema).validate(object);
    if (error) {
        const errors = error.details.map((detail) => detail.message).join(',');
        next(new ApiError(400, errors));
        return res.status(400).send({ error: true, errors });
    }
    return next();
};

module.exports = validate;
