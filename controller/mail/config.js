module.exports = {
    reveiveEmail: '59637423@qq.com', // 邮件通知对象，签到信息（成功，失败都发送）
    /* mail.js邮件发送者账号信息，此邮件发送到reveiveEmail */
    mail_opts: {
        host: 'smtp.163.com',
        port: 25,
        auth: {
            user: 'giscafer@163.com', // 邮箱账号
            pass: 'xxxx' // 密码
        }
    }
};
