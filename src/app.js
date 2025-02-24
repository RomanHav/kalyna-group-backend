
import express from 'express';
import cors from 'cors';
import clientsRoutes from './routes/clients.js';
import subscribersRoutes from './routes/subscribers.js';
import postsRoutes from './routes/posts.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

export const startServer = async () => {
  try {

    const allowedOrigin = 'https://kalynagroup.space'; // Разрешённый домен

    app.use(cors({
      origin: allowedOrigin,
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type,Authorization'
    }));

    app.use(express.json());
    app.use(express.static('public'));

    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
    app.use('/clients', clientsRoutes);
    app.use('/subscribers', subscribersRoutes);
    app.use('/posts', postsRoutes);
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};
