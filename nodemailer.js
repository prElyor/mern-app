const nodemailer = require('nodemailer')
const config = require('config')

async function mailer(to, subject, text) {

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.mail.ru',
            secure: true,
            port: 465,
            auth: {
                user: config.get('userMail'),
                pass: config.get('passwordMail')

            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true
        },
        {
            from: config.get('userMail'),
        }
    )

    const mailOptions = {
        to: to,
        subject: subject,
        text: text
    }

    await transporter.verify(function (error, success) {
        if (error) {
            console.log('error::', error);
        } else {
            console.log('Server is ready to take our messages', success);
        }
    })

    await transporter.sendMail(mailOptions, (err, info) => {
        console.log(err, info);
    })
}

module.exports = mailer