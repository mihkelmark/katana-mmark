import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import decksRouter from './src/routes/decks';

dotenv.config({ path: path.resolve(__dirname, '.././.env') });

import { DB_CONN_STRING } from './config/db.config';

mongoose.connect(DB_CONN_STRING);

const app = express();
const port =
  process.env.NODE_ENV === 'test'
    ? process.env.NODE_DOCKER_TEST_PORT
    : process.env.NODE_DOCKER_PORT;

export const con = mongoose.connection;

con.on('open', () => {
  console.log('Connection to mongoDB established 🟢');
});

app.use(morgan('combined'));
app.use(express.json());
app.use('/decks', decksRouter);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
