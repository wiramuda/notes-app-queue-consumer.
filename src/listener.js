class Listener{
    constructor(service, mailSender) {
        this._sevice = service;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try{
            const {userId, targetEmail} = JSON.parse(message.content.toSting());
            const notes = await this._sevice.getNote(userId);
            const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(notes));
            console.log(result);


        }catch(err){
            console.log(err);
        }

    }
}