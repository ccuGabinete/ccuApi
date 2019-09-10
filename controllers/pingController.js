const ping = require('ping');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


module.exports.ping = (req, res, next) => {
    sendJsonResponse(res, 200, {data: 'data'})
}


