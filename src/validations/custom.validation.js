const validator = require('validator');

const password = (value, helpers) => {
    if (!validator.isStrongPassword(value)) {
        return helpers.message(
            'Password should contain atleast one uppercase and lowercase letter, number and special character',
        );
    }
    return value;
};

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message("'{{#label}}' must be a valid mongo id.");
    }
    return value;
};

module.exports = { password, objectId };
