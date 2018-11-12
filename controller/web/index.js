
// 2018-11-12 21:39:43

var formidable = require('formidable');
var fs = require('fs');
var speech = require('../../voice/recognize');

var Moment = require('moment');
var Email = require('../mail/mail');

// 首页
exports.index = function (req, res) {
    res.render('website/index/index');
};

// 识别base64音频文件
exports.recogizeRecordByBase64 = function (req, res) {

    // parse a file upload
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var voicefile = files['voicefile'];
        console.log(voicefile)
        let voice = fs.readFileSync(voicefile.path);
        // fs.writeFileSync('voice/test.wav', voice);
        let voiceBuffer = Buffer.from(voice);
        speech.recognize(voiceBuffer).then(json => {
            console.log(JSON.stringify(json));
            if (json.err_no === 0) {
                res.send({ status: 'success', data: result });
            }
            res.send({ status: 'fail', err: json });
        }).catch(err => {
            console.log(err);
            res.send({ status: 'fail', err: err });
        })
    });

    return;

};






