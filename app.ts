import express from 'express';
import mongoose from 'mongoose';

import decksRouter from './src/routes/decks';

mongoose.connect('mongodb://127.0.0.1:27017/katana');

const app = express();
const port = 3000;
const con = mongoose.connection;

con.on('open', () => {
  console.log('Connection to mongoDB established 🟢');
});

app.use(express.json());
app.use('/decks', decksRouter);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
