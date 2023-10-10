const writerSonicService = require('../services/writeSonicApi.service') 

const rewriterTinqAi = async (req, res) => {
    let userId= req.user
    let response =await writerSonicService.rewriterTinqAi(userId,req.body)
    console.log(response);
    res.status(200).json(response);
}

const aiTinqExtander =async (req, res) => {
    let userId= req.user
    let response=await  writerSonicService.aiTinqExtander(userId,req.body)
    res.status(200).json(response);
}

const aiWriter = async (req, res) => {
    let userId= req.user
    let response =await  writerSonicService.aiWriter(userId,req.body)
    res.status(200).json(response);
}

const aiTinqSum = async (req, res) => {
    let userId= req.user
    let response = await writerSonicService.aiTinqSum(userId,req.body)
    res.status(200).json(response);
}
const grammarCheckTinqAi = async (req, res) => {
    let userId= req.user
    let response = await writerSonicService.grammarCheckTinqAi(userId,req.body)
    res.status(200).json(response);
}



module.exports = {
    rewriterTinqAi,
    aiTinqExtander,
    aiWriter,
    aiTinqSum,
    grammarCheckTinqAi
}