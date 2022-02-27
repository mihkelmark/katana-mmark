import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

import decksRouter from './src/routes/decks';
// import { DB_CONN_STRING } from './config/db.config';

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/katana');
// mongoose.connect(DB_CONN_STRING);

const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;
const con = mongoose.connection;

con.on('open', () => {
  console.log('Connection to mongoDB established 🟢');
});

app.use(morgan('combined'));
app.use(express.json());
app.use('/decks', decksRouter);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
