import mongoose, { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import Card from './Card';

export interface DeckType {
  _id: string;
  type: string;
  shuffled: boolean;
  cards: any;
}

const deckSchema = new mongoose.Schema<DeckType>(
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
  { versionKey: false },
);

export default mongoose.models.Deck || mongoose.model('Deck', deckSchema);
