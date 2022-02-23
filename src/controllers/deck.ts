import { Request, Response } from 'express';
import { determineCardCode, shuffleArray } from '../utils';
import { CARD_VALUES, CARD_SUITS } from '../constants';

import Deck from '../models/deck';

const getDecks = async (req: Request, res: Response) => {
  const result = await Deck.find({});
  res.json(result);
};

const createDeck = async (req: Request, res: Response) => {
  const type: 'FULL' | 'SHORT' = req.body.type;
  const shuffled: boolean = req.body.shuffled;
  let cardValuesRequested; // type?
  let deck; // type?

  if (type === 'FULL') {
    cardValuesRequested = CARD_VALUES;
  } else {
    cardValuesRequested = CARD_VALUES.slice(4);
  }

  deck = cardValuesRequested
    .map((i) => {
      return CARD_SUITS.map((j) => {
        return { value: i, suit: j, code: determineCardCode(i, j) };
      });
    })
    .flat();

  if (shuffled) {
    deck = shuffleArray(deck);
  }

  const item = {
    type: type,
    shuffled: shuffled,
    contents: deck,
  };

  new Deck(item).save().then((doc: any) => {
    res.json({ responseBody: doc }); // Perhaps think of a nice standard responsebody
  }); // TODO: any Type and error handling
};

export default { createDeck, getDecks };
