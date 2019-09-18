const credentials = require('../credentials.json');
const fs = require('fs');
const { google } = require('googleapis');
const util = require('util');
const promisify = util.promisify;
const folderId = '1Prkv4TK-dB-UvXzk1vsqbKi2a9tPDSD7';
const base64 = require('base64-img')

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
}


const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });
const converterFoto = promisify(base64.img)

const salvarSync = async (res, nome) => {

  var fileMetadata = {
    'name': nome,
    parents: [folderId]
  };
  var media = {
    mimeType: 'image/png',
    body: fs.createReadStream(__dirname + '/public/asserts/teste.jpg')
  };

  try {

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    sendJsonResponse(res, 200, 'https://drive.google.com/uc?id=' + response.data.id)

  } catch (err) {
    console.log(err);
  }
}

module.exports.salvarImagem = async (req, res, next) => {

  converterFoto(req.body.base64, __dirname + '/public/asserts', 'teste')
    .then((filepath) => {
      salvarSync(res, req.body.nome);
    })

    .catch((err) => {
      sendJsonResponse(res, 500, { error: err })
    })
}

