require('dotenv').config();
const amqp = require('amqplib');
const NotesService = require('./NodeService');
const Listener = require('./listener');
const MailSender = require('./mailSender');

const init = async () => {
    const notesService = new NotesService();
    const mailSender = new MailSender();
    const listener = new Listener(notesService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('exports:notes', {
        durable: true
    });
    channel.consume('exports:notes',listener.listen, {noAck: true});

}

init()