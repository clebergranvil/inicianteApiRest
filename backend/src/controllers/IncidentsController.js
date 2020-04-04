const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('omgs', 'omgs_id', '=', 'incidents.omgs_id')
            .limit(2)
            .offset( (page - 1) * 2)
            .select(['incidents.*', 
                'omgs.name', 
                'omgs.email', 
                'omgs.whatsapp', 
                'omgs.city', 
                'omgs.uf']);

        response.header('X-Total-count', count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response){
        const {title, description, value} = request.body;
        const omgs_id = request.headers.authorization; 

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            omgs_id
        });
        return response.json({id});
    },
    async delete(request, response){
        console.log(request.params);
        const {id} = request.params;
        const omgs_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('omgs_id')
            .first();

        if (incidents.omgs_id !== omgs_id){
            return response.status(401).json({error: 'Operation not pemitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}