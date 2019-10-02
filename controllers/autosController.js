
var GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const credentials = require('../credentials.json');
const spreedsheetId = '1u6m6FD4BmdpZejGK_Q8X1QO-QHSZzYj4LmPb96MfHG0';
const doc = new GoogleSpreadsheet(spreedsheetId);

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}


module.exports.acessarPlanilha = async() => {
    try
    {
        const doc =  new GoogleSpreadsheet(spreedsheetId);
        await promisify(doc.useServiceAccountAuth)(credentials);
        return await promisify(doc.getInfo)();
            
    }
    catch(err){
        console.log(err);
    }
   
}

module.exports.contarLinhas = async (req, res, next) => {
      
        const info = await this.acessarPlanilha();
        const folhaDeDados = info.worksheets[0]
        const linhas = await promisify(folhaDeDados.getRows)({})
        res.json({total: linhas.length});        
}

module.exports.salvar = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const response = await promisify(folhaDeDados.addRow)(req.body)
    res.json(response);        
}







