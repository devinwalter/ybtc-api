import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { attachUser, requireAuth } from '@/middleware';
import routes from '@/routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.get('/', requireAuth, attachUser, (req, res) => {
  res.json({ message: 'You Be The Critic API is live.', user: req.user });
});

export default app;
