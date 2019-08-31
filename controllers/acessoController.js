const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const credentials = require('../credentials.json');
const spreedsheetId = '1ybLiQCSJld-go-cjcJbH38EaQc_l_ghGDkZceEYIkAE';
const hash = require('../hash/hash');
const colunaSenha = 'C3';
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

module.exports.validarSenha = async (req, res, next) => {
      
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0]
    const linhas = await promisify(folhaDeDados.getRows)({
        query: 'login = ' + req.body.login
    })

   if(linhas.length > 0){
        const hashSenha = linhas[0].senha;  
        var resposta = await hash.validarSenha(req.body.senha, hashSenha);
        
        res.json(resposta);
   }else{
       res.json(false);
   }    
}


module.exports.atualizarSenha = async (req, res, next) => {
      
    this.login = req.body.login;
    this.senha = req.body.senha;
   
    const info = await this.acessarPlanilha();
    const folhaDeDados = info.worksheets[0];
    const linhas = await promisify(folhaDeDados.getCells)({});
 
    let filter = (celula) => {
        return celula.value == this.login;
    }

    let celula = linhas.filter(filter)[0];

    if(celula){
        let linhaEncontrada = celula.batchId.substring(0,2)
    
        let batchId = linhaEncontrada + colunaSenha;
        console.log(batchId);
        

        let filterSenha = (celula) => {
            return celula.batchId == batchId;
        }

        let celulaLogin = linhas.filter(filterSenha)[0]
        console.log(celulaLogin);
           
        celulaLogin.value = this.senha;
        celulaLogin.save();   
        folhaDeDados.bulkUpdateCells(linhas);
        res.json(0);
        
    }else{
        res.json(-1);
    }
        
}

