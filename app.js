import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger.json', (req, res) => {
  return res.json(swaggerDocument);
});

app.use(router);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Server is running',
  });
});

export default app;
