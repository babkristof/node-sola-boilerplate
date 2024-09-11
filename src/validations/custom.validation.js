const validator = require('validator');

const password = (value, helpers) => {
    if(!validator.isStrongPassword(value)) {
        return helpers.message('Password should contain atleast one uppercase and lowercase letter, number and special character');
    }
    return value;
};

module.exports = { password } 