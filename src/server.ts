import express from 'express';
import routes from './routes/index';

const app = express();

app.get('/', (request, response) => response.send('ola'));

app.listen(3333);
