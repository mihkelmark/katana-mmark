const CARD_VALUES = [
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
] as const;

const CARD_SUITS = ['CLUBS', 'DIAMONDS', 'SPADES', 'HEARTS'] as const;

export { CARD_VALUES, CARD_SUITS };
