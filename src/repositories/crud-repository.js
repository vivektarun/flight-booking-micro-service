const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    
}

module.exports = CrudRepository;
