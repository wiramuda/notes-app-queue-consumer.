const { Pool } = require('pg/lib');

class NodeService{
    constructor(){
        this._pool = new Pool()
    }

    async getNotes(userId) {
        const query = {
            text: `select notex.* from notes n
            left join collaboration c on n.id = c.note_id
            where n.owner=$1 or c.user_id=$1
            group by n.id`,
            values:[userId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = NodeService;