
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.resposta = (req, res, next) => {
  
    // req.params.id => numero da notificação
    sendJsonResponse(res, 200, {notificacao: req.params.id});
    
}