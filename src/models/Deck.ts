import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import Card from './Card';

const deckSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    type: {
      type: String,
      enum: ['FULL', 'SHORT'],
      required: true,
    },
    shuffled: {
      type: Boolean,
      required: true,
    },
    cards: { type: [Card.schema], required: true },
  },
  { _id: false },
);

export default mongoose.models.Deck || mongoose.model('Deck', deckSchema);
