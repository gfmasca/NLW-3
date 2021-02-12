import express, {
  NextFunction, Request, Response,
} from 'express';

import './database/connection';
import 'express-async-errors';
import { MulterError } from 'multer';
import { ValidationError } from 'yup';

import path from 'path';
import routes from './routes';
import AppError from './errors/AppError';
import IValidationError from './errors/IValidationError';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routes);

app.get('/teste', (req: Request, res: Response) => res.json({ message: 'Hello World' }));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof MulterError) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    const errors: IValidationError = {};

    err.inner.forEach((error) => {
      const errorPath = error.path as string;

      errors[errorPath] = error.errors;
    });

    return res.status(400).json({
      status: 'Validation Error',
      message: errors,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('SERVER STARTED ON PORT 3333'));
