import {Express, Request, Response} from 'express';
import { createUserSessionHandler, getUserSessionsHandler,deleteSessionHandler } from '../controller/session.controller';
import { createUserHandler } from '../controller/user.controller';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema'
import {createSessionSchema} from '../schema/session.schema'
import requiredUser from '../middleware/requireUser';

function routes(app:Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requiredUser, getUserSessionsHandler);

    app.delete('/api/sessions',  requiredUser, deleteSessionHandler);

}
export default routes;      