const credentials = require('../credentials.json');
const fs = require('fs');
const {google} = require('googleapis');
const util = require('util');
const promisify = util.promisify;
const folderId = '1K_f3NvyCe1I59rzjN6FoCcf1cPBYAClt';
const promise = require('q');

const scopes = [
    'https://www.googleapis.com/auth/drive'
  ];

  const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
  );

  const drive =  google.drive({version: 'v3', auth});
  const salvarFoto = promisify(drive.files.create)
    
  const salvarSync = async () => {
      
    var fileMetadata = {
      'name':'teste2.png',
      parents: [folderId]
    };
    var media = {
      mimeType: 'image/png',
      body: fs.createReadStream('')
    };
    
    try{

        const teste = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        console.log(teste.data);
    
    }catch(err){
        console.log(err);
    }
}

module.exports.salvarImagem = async (req, res, next) => {
    
    const fileMetadata = {
        'name':'teste2.png',
        parents: [folderId]
    };

    const  media = {
        mimeType: 'image/png',
        body: fs.createReadStream('../t.png')
    };
      
  
    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });
  
    res.json(linha);
   
            
}
