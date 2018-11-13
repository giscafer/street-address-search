
/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-11-12 22:41:34
 * @description: 
 */


const formidable = require('formidable');
const fs = require('fs');
const speech = require('../../voice/recognize');
const geocode = require('../../module/geocode');


// 首页
exports.index = function (req, res) {
    res.render('website/index/index');
};

// 识别base64音频文件
exports.recognizeVoice = function (req, res) {

    // parse a file upload
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const voicefile = files['voicefile'];
        console.log(voicefile)
        let voice = fs.readFileSync(voicefile.path);
        // fs.writeFileSync('voice/test.wav', voice);
        let voiceBuffer = Buffer.from(voice);
        speech.recognize(voiceBuffer).then(json => {
            console.log(JSON.stringify(json));
            if (json.err_no === 0) {
                res.send({ status: 'success', data: json });
               /*  let result = json.result;
                console.log(result.join('')) 
                geocode(result.join('')).then(address => {
                    return res.send({ status: 'success', data: address });
                }).catch(err => {
                    return res.send({ status: 'fail', err: err, msg: '高德地图api调用失败!' });
                }); */
            }
            return res.send({ status: 'fail', err: json });
        }).catch(err => {
            console.log(err);
            return res.send({ status: 'fail', err: err });
        })
    });

    return;
};


exports.geocode = function (req, res) {
    const addressText = req.body.addressText;
    const city = req.body.city;
    geocode(addressText, city).then(result => {
        return res.send(result);
    }).catch(err => {
        return res.send({ status: 'fail', err: err, msg: '高德地图api调用失败!' });
    });
}






