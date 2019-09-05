var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require('google-spreadsheet');
const google = require('../controllers/googleController');
const acesso = require('../controllers/acessoController');
const fotos = require('../controllers/teste')
const { promisify } = require('util')
const credentials = require('../credentials.json')
const spreedsheetId = '1crH8vAK_E8wK7Vt8IDy8xN772HENebuXZoBicwmT_ew';
const doc = new GoogleSpreadsheet(spreedsheetId);
var mid = require('../asyncMiddleware')

router.get('/listarTodas', mid.asyncMiddleware(google.listarTodas))
router.post('/', mid.asyncMiddleware(google.salvar))
router.post('/buscarId', mid.asyncMiddleware(google.buscarId))
router.post('/removerId', mid.asyncMiddleware(google.removerId))
router.post('/buscarDoc', mid.asyncMiddleware(google.buscarDoc))
router.post('/acesso/validar', mid.asyncMiddleware(acesso.validarSenha))
router.post('/acesso/atualizarSenha', mid.asyncMiddleware(acesso.atualizarSenha))
router.get('/salvarFoto', mid.asyncMiddleware(fotos.salvarImagem))

module.exports = router

