/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-11-13 09:55:25
 * @description: 统一封装接口请求
 */

const getOptions = {
    "method": 'get',
    "Content-Type": 'application/json',
    "referer": "https://detail.tmall.com/item.htm",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
};

exports.get = (url) => {
    console.log(url)
    url = encodeURI(url);
    return new Promise((resolve, reject) => {
        fetch(url, getOptions).then(response => {
            if (response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return [];
        }).then(json => {
            return resolve(json);
        }).catch(err => {
            console.log('接口请求异常');
            return reject(err);
        });
    });
}


exports.post = (url, data) => {
    const postOpts = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    return new Promise((resolve, reject) => {
        fetch(url, postOpts).then(response => {
            if (response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return [];
        }).then(json => {
            return resolve(json);
        }).catch(err => {
            console.log('接口请求异常');
            return reject(err);
        });
    });
}
