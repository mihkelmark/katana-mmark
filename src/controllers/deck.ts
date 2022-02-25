import { Request, Response } from 'express';
import { determineCardCode, shuffleArray } from '../utils';
import { CARD_VALUES, CARD_SUITS } from '../constants';

import Deck from '../models/deck';

const getDecks = async (req: Request, res: Response) => {
  const result = await Deck.find({});
  res.json(result);
};

const getDeck = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const deck = await Deck.findById(uuid).exec();

    if (!deck) {
      return res.status(404).json({ status: 404, error: `Deck with id '${uuid}' not found` });
    }

    res.json({
      status: 200,
      result: {
        deckId: deck._id,
        shuffled: deck.shuffled,
        remaining: deck.cards.length,
        cards: deck.cards,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

const createDeck = async (req: Request, res: Response) => {
  const { type, shuffled }: { type: 'FULL' | 'SHORT'; shuffled: boolean } = req.body;

  let cardValuesRequested; // type?
  let deck; // type?

  if (type === 'FULL') {
    // without supplying deck size, it still creates a short one.
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
    cards: deck,
  };

  try {
    const result = await new Deck(item).save();

    res.json({
      status: 200,
      result: { deckId: result._id, type, shuffled, remaining: deck.length },
    });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

const drawFromDeck = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const count: number = req.body.count;

  try {
    const deck = await Deck.findById(uuid).exec();

    if (!deck) {
      return res.status(404).json({ status: 404, error: `Deck with id '${uuid}' not found` });
    }

    if (deck.cards.length < 1) {
      // this case should be handled as well. Think of some nice lean uniform validation logic.
    }

    if (!count) {
      return res
        .status(500)
        .json({ status: 500, error: `Please provide a positive number of cards you want to draw` });
    }

    const deckCards = deck.cards;
    const drawnCards = deckCards.slice(-count);

    Deck.updateOne(
      { _id: uuid },
      {
        cards: deckCards.filter(
          (deckCard: any) => !drawnCards.some((drawnCard: any) => deckCard.code === drawnCard.code),
        ),
      },
    ).exec();

    res.json({ status: 200, result: drawnCards });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export default { createDeck, getDecks, getDeck, drawFromDeck };
