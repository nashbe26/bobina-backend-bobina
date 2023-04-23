
var express = require('express');
const router = express.Router();

const writesonicController = require('../controllers/writeSonicApi.controller');



router.post('/rewriterTinqAi', writesonicController.rewriterTinqAi);


router.post('/checkPlagiarism', writesonicController.checkPlagiarism);


router.post('/aiWriter', writesonicController.aiWriter);


router.post('/aiTinqSum', writesonicController.aiTinqSum);




module.exports = router