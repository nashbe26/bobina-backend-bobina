const axios = require('axios');
const { URLSearchParams } = require('url');
const createError = require('http-errors');
const { getUserById, updateNbrWords } = require('./user.service');
const sdk = require('api')('@tinq/v1.0#7plfu0xl6ql5c85');

async function checkIfNrWord(userId){

    const user = await getUserById(userId);

    if(user.plan =="free" && user.nbr_words > 25000)
        throw createError(401,'You have reached you limit as free user!');

    if(user.plan =="starter" && user.nbr_words > 8000)
        throw createError(401,'You have reached you limit as starter user!');

    if(user.plan =="premuim" && user.nbr_words > 20000)
        throw createError(401,'You have reached you limit as premium user!');

    if(user.plan =="custom" && user.nbr_words > 100000)
        throw createError(401,'You have reached you limit as custom user!');

    
    let engine =""

    switch(user.plan){
        case "free":
            engine="economy";
            break;
        case "starter":
            engine="good";
            break;
        case "premuim":
            engine="premuim";
            break;
        case "custom":
            engine="custom";
            break;
        default:
            break;
    }

    return engine;
}

exports.rewriterTinqAi =async  function(userId,data) {
    
  
    
    const encodedParams = new URLSearchParams();
    encodedParams.set('text', data.text);
    encodedParams.set('mode', data.mode);
    encodedParams.set('lang', data.lang);
    
    const options = {
      method: 'POST',
      url: 'https://tinq.ai/api/v1/rewrite',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        authorization: 'Bearer key-f5729522-7d89-4215-9e45-9697a84bb1a5-640dc5d1ae0a9'
      },
      data: encodedParams,
    };
    
    return await axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw createError(401,error)
      });
       

}

exports.checkPlagiarism  =async  function(userId,data) {


    
    const encodedParams = new URLSearchParams();
    encodedParams.set('text', data.text);
    
    const options = {
      method: 'POST',
      url: 'https://tinq.ai/api/v1/check-plagiarism',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        authorization: 'Bearer key-f5729522-7d89-4215-9e45-9697a84bb1a5-640dc5d1ae0a9'
      },
      data: encodedParams,
    };
    
    return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw createError(401,error)
    });
    

}

exports.aiWriter =async  function(userId,data) {


const options = {
  method: 'POST',
  url: 'https://tinq.ai/api/v2/assistant/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer 74|uNe9jhq0xEep2C1BldjJZxZb0ftSkNXJO4psKhkn'
  },
  data: {
    lang: data.lang,
    tone: data.mode,
    length: data.length,
    creativity: data.cre,
    tool: 'news_article',
    topic: data.text,
    number: 1,
    paragraphs: 1,
    keywords:data.keyword
  }
    };

    const res = await axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        throw createError(401,error)
    });

    return res

}

exports.aiTinqSum =async  function(userId,data) {
    const encodedParams = new URLSearchParams();

    encodedParams.set('text', data.text);
    encodedParams.set('output_percent', '30');
    
    
    const options = {
      method: 'POST',
      url: 'https://tinq.ai/api/v1/summarize',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        authorization: 'Bearer key-f5729522-7d89-4215-9e45-9697a84bb1a5-640dc5d1ae0a9'
      },
      data: encodedParams,
    };
    
    const res = await axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        throw createError(401,error)
    });

    return res
}

