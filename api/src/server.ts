import express, { Request, Response } from 'express';

import './database/connection';

import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routes);

app.get('/teste', (req: Request, res: Response) => res.json({ message: 'Hello World' }));

app.listen(3333, () => console.log('SERVER STARTED ON PORT 3333'));
