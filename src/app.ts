import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { requireAuth } from '@/middleware';
import routes from '@/routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.get('/', (_req, res) => {
  res.json({ message: 'You Be The Critic API is live.' });
});

export default app;
