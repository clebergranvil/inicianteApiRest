const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const omgs = await connection('omgs')
            .where('id', id)
            .select('name')
            .first();

        if (!omgs){
            return response.status(400).json({error: 'No OMG found with this ID.'});
        }

        return response.json(omgs);
    }
}