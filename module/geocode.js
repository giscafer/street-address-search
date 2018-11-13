/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-11-13 09:33:01
 * @description: 
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const handle = require('./handle');
const api = require('./api');

// 根据详细地址找政区，兴趣点
// https://restapi.amap.com/v3/geocode/geo?key=26f843db0f8f4ba4e2a5d6e69671ee6a&address=%E5%A4%A9%E5%B9%B3%E6%9E%B65%E5%8F%B7%E7%A9%BA%E9%97%B4&city=%E5%B9%BF%E5%B7%9E
// 根据兴趣点坐标找街道信息等
// https://restapi.amap.com/v3/geocode/regeo?key=26f843db0f8f4ba4e2a5d6e69671ee6a&location=113.320471,23.162441&radius=200&extensions=all

const map_key_test = '26f843db0f8f4ba4e2a5d6e69671ee6a';

/* 地理编码 */
const getGeoUrl = (address, city = '') => {
    return `https://restapi.amap.com/v3/geocode/geo?address=${address}&city=${city}&key=${map_key_test}`
}
/* 逆地理编码 */
const getRegeoUrl = (location) => {
    return `https://restapi.amap.com/v3/geocode/regeo?key=26f843db0f8f4ba4e2a5d6e69671ee6a&location=${location}&radius=200&extensions=all`
}


const resultHandler = (result = {}, err) => {

    return err ? {
        status: 'fail',
        error: err
    } : {
            status: 'success',
            data: {
                ...result
            }
        };
}

/* 地址编码查询 */
async function geocode(address, city = '') {
    if (!address) {
        return console.log('请输入地址');
    }
    const [err, json] = await handle(api.get(getGeoUrl(address, city)));
    if (err || !json) {
        return resultHandler(null, '地理编码查询失败！');
    }
    if (json.status !== '1' || !(json.geocodes && json.geocodes[0])) {
        return resultHandler(null, '地理编码查询失败！');
    }

    const addressObj = json.geocodes[0];

    if (!addressObj.location) {
        return {
            province: addressObj.province,
            city: addressObj.city,
            district: addressObj.district,
            street: addressObj.street
        }
    }

    const [regoErr, reGeoJson] = await handle(api.get(getRegeoUrl(addressObj.location)));

    if (regoErr || !reGeoJson) {
        return resultHandler(null, '地理逆编码查询失败！');
    }
    if (reGeoJson.status !== '1' || !(reGeoJson.regeocode && reGeoJson.regeocode['addressComponent'])) {
        return;
    }

    // console.log(reGeoJson.regeocode['addressComponent']);

    return resultHandler(reGeoJson.regeocode['addressComponent']);
}


// geocode('天平架5号空间', '广州');


module.exports = geocode;