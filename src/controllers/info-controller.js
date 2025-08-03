const { StatusCodes } = require('http-status-codes');

function info(req, res) {
    return res.status(StatusCodes.OK).json({
        sucess: true,
        message: 'Api is up',
        error: {},
        data: {}
    })
}

module.exports = {
    info
}