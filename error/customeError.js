
class customError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

const createCustomeError = (message, statusCode) => {
    return new customError(message, statusCode);
};

module.exports = {createCustomeError, customError};