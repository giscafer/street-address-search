'use strict'

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const util = require('util');
const config = require('./config');


const mail_opts = config.mail_opts;

const transport = mailer.createTransport(smtpTransport(mail_opts));

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data) {
    transport.sendMail(data, function (err) {
        if (err) {
            // 写为日志
            console.error(err);
        }
    });
}


/**
 * 发送错误通知邮件
 * @param {String} who 接收人的邮件地址
 */
function sendErrorMail(who, message) {
    var from = util.format('%s <%s>', 'smat租车订单', mail_opts.auth.user);
    var to = who;
    var subject = '签到失败咯！！！';
    var html = '<p>错误原因：</p>' +
        '<p>' + message + '</p>';
    sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
}

/**
 * 发送成功通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} order
 */
function sendSuccessMail(order) {
    var from = util.format('%s <%s>', 'smat租车订单', mail_opts.auth.user);
    var to = config.reveiveEmail;
    var subject = '新订单来了';
    var html = `<p>订单信息： ${order.name}（先生/女士）想要租车，车型为：${order.carType}，手机号：${order.phone}</p>`;
    html += '前往订单管理查看更多信息>>> <a href="http://www.smatrent.com/manage">订单管理后台</a>';
    sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { sendErrorMail, sendSuccessMail };