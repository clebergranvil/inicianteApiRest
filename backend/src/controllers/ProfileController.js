const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const omgs_id = request.headers.authorization; 

        const incidents = await connection('incidents')
            .where('omgs_id', omgs_id)
            .select('*');
            
        return response.json(incidents);
    },
}