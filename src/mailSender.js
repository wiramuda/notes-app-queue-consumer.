const nodemailer = require('nodemailer');

class MailSender{
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            },
        });
    }

    sendMail(targetEmail, content) {
        const message = {
            from: 'Notes app',
            to: targetEmail,
            subject: 'Ekspor Catatan',
            text: 'Terlampir hasil dari export catatan',
            attachment: [
                {
                    filename: 'notes.json',
                    content,
                }
            ]
        }
        this._transporter.sendMail(message);
    }
}

module.exports = MailSender;