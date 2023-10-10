const axios = require('axios');
const { URLSearchParams } = require('url');
const createError = require('http-errors');
const { getUserById, updateNbrWords } = require('./user.service');
const sdk = require('api')('@writesonic/v2.2#4ekm6b01flcau4wqa');

sdk.auth('46dbadee-4800-47a9-bc19-18620a37fa77');

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

exports.grammarCheckTinqAi =async  function(userId,data) {

  if(data.lang == 'en')
  return sdk.chatsonic_V2BusinessContentChatsonic_post({
    enable_google_results: 'true',
    enable_memory: false,
    input_text: 'Check the gramma of this text and answer with only the correct text. /n' + " " +data.text 
  }, {engine: 'premium', language: data.lang})
    .then(({ data }) => data.message)
    .catch(err => console.error(err));
    else if(data.lang=="fr")
    return sdk.chatsonic_V2BusinessContentChatsonic_post({
      enable_google_results: 'true',
      enable_memory: false,
      input_text: 'Vérifiez le gramme de ce texte et réponds uniquement le texte correct. /n' + " " +data.text 
    }, {engine: 'premium', language: data.lang})
      .then(({ data }) => data.message)
      .catch(err => console.error(err));

}

exports.rewriterTinqAi =async  function(userId,data) {
    
  return sdk.contentRephrase_V2BusinessContentContentRephrase_post({
    tone_of_voice: data.mode,
    content_to_rephrase:data.text
  }, {engine: 'premium',  language: data.lang,  num_copies: '1'
})
  .then(({ data }) => data[0].text)
  .catch(err => console.error(err));
}


exports.aiWriter =async  function(userId,data) {

    return sdk.paragraphWriter_V2BusinessContentParagraphWriter_post({
      tone_of_voice: data.mode,
      paragraph_title:data.text
    }, {
      engine: 'premium',
      language: data.lang,
      num_copies: '1'

    })
      .then(({ data }) => data[0].text)
      .catch(err => console.error(err));

}

exports.aiTinqSum =async  function(userId,data) {
  return  sdk.summary_V2BusinessContentSummary_post({article_text: data.text}, {engine: 'premium',  language: data.lang, num_copies: '1'})
  .then(({ data }) =>data[0].summary)
  .catch(err => console.error(err));
}

exports.aiTinqExtander =async  function(userId,data) {

  return sdk.sentenceExpand_V2BusinessContentSentenceExpand_post({
    tone_of_voice: data.mode,
    content_to_expand:data.text
  }, {
    engine: 'premium',
    language: data.lang,
    num_copies: '1'

  })
    .then(({ data }) => data[0].text)
    .catch(err => console.error(err));
}