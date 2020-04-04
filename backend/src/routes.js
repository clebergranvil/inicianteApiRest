const express = require('express');
const OmgsController = require('./controllers/OmgsController');
const ProfileController = require('./controllers/ProfileController');

const IncidentsController = require('./controllers/IncidentsController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/sessions', SessionController.create);

routes.get('/omgs', OmgsController.index);
routes.post('/omgs', OmgsController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;