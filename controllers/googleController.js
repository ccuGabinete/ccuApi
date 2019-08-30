
var GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const credentials = require('../credentials.json');
const spreedsheetId = '1crH8vAK_E8wK7Vt8IDy8xN772HENebuXZoBicwmT_ew';
const doc = new GoogleSpreadsheet(spreedsheetId);


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

module.exports.listarTodas = async (req, res, next) => {
      
        const info = await this.acessarPlanilha();
        const folhaDeDados = info.worksheets[0]
        const linhas = await promisify(folhaDeDados.getRows)({})
        res.json(linhas);        
}

module.exports.salvar = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const response = await promisify(folhaDeDados.addRow)(req.body)
    res.json(response);        
}

module.exports.buscarId = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const linhas = await promisify(folhaDeDados.getRows)({
        query: 'id = ' + req.body.id.toString()
    })

    res.json(linhas);        
}

module.exports.removerId = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const linha = await promisify(folhaDeDados.getRows)({
       
    })

    let filter = (celula) => {
        return celula.value == req.body.id
    }

    let response = linha.filter(filter)

    if(linha.length > 0){
        console.log(response)
    }

    

    res.json(linha);        
}

module.exports.atualizarId = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const linhas = await promisify(folhaDeDados.getCells)({
       
    })

    let filterId = (celula) => {
        return celula.value == id
    }

    let celulaId = linhas.filter(filterId)[0];
    let linhaEncontrada = celulaId.batchId.substring(0,2)
    nomeBatchId = linhaEncontrada + colunaNome;
    idadeBatchId = linhaEncontrada + colunaIdade;

    let filterNome = (celula) => {
        return celula.batchId == nomeBatchId;
    }

    let filterIdade = (celula) => {
        return celula.batchId == idadeBatchId;
    }

    let celulaNome = linhas.filter(filterNome)[0]
    let celulaIdade = linhas.filter(filterIdade)[0]
    

    if(req.body.login){
        celulaNome.value = nome;
        celulaNome.save();

    if(req.body.senha){
        celulaIdade.value = idade;
        celulaIdade.save();
    }


    folhaDeDados.bulkUpdateCells(linhas);

    }
    
}
