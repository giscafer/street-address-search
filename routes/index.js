var Index = require('../controller/web/index');



module.exports = function (app) {
  // 
  app.get('/', Index.index);

  app.post('/web/recognizeVoice', Index.recognizeVoice);
};