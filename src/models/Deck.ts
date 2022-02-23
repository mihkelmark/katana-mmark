import mongoose from 'mongoose';

import Card from './Card';

const deckSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FULL', 'SHORT'],
    default: 'FULL',
  },
  shuffled: {
    type: Boolean,
    required: true,
    default: false,
  },
  contents: { type: [Card.schema], required: true },
});

export default mongoose.models.Deck || mongoose.model('Deck', deckSchema);
