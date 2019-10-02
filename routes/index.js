var express = require('express');
var router = express.Router();
const google = require('../controllers/googleController');
const acesso = require('../controllers/acessoController');
const fotos = require('../controllers/photosController');
const scca = require('../controllers/sccaController');
const autos = require('../controllers/autosController');
var mid = require('../asyncMiddleware');

router.get('/listarTodas', mid.asyncMiddleware(google.listarTodas))
router.post('/', mid.asyncMiddleware(google.salvar))
router.post('/buscarId', mid.asyncMiddleware(google.buscarId))
router.post('/removerId', mid.asyncMiddleware(google.removerId))
router.post('/buscarDoc', mid.asyncMiddleware(google.buscarDoc))
router.post('/acesso/validar', mid.asyncMiddleware(acesso.validarSenha))
router.post('/acesso/atualizarSenha', mid.asyncMiddleware(acesso.atualizarSenha))
router.post('/acesso/salvar', mid.asyncMiddleware(acesso.salvar))
router.post('/salvarFoto', mid.asyncMiddleware(fotos.salvarImagem))
router.post('/notificado', scca.getScca);
router.post('/autos/salvar', mid.asyncMiddleware(autos.salvar))
router.get('/autos/contarLinhas', mid.asyncMiddleware(autos.contarLinhas))


module.exports = router

