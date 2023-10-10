
var express = require('express');
const router = express.Router();

const writesonicController = require('../controllers/writeSonicApi.controller');



router.post('/rewriterTinqAi', writesonicController.rewriterTinqAi);

router.post('/aiTinqExtander', writesonicController.aiTinqExtander);

router.post('/aiWriter', writesonicController.aiWriter);

router.post('/aiTinqSum', writesonicController.aiTinqSum);

router.post('/grammarCheckTinqAi', writesonicController.grammarCheckTinqAi);




module.exports = router