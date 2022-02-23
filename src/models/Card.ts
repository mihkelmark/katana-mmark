import mongoose from 'mongoose';
import { CardValues, CardSuits } from '../types';

const cardSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      enum: [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'JACK',
        'QUEEN',
        'KING',
        'ACE',
      ] as CardValues,
    },
    suit: {
      type: String,
      enum: ['CLUBS', 'DIAMONDS', 'SPADES', 'HEARTS'] as CardSuits,
    },
    code: {
      type: String,
    },
  },
  { _id: false },
);

export default mongoose.models.User || mongoose.model('Card', cardSchema);