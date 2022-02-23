import { CARD_VALUES, CARD_SUITS } from './constants';

type CardValues = typeof CARD_VALUES;
type CardValuesUnion = typeof CARD_VALUES[number];
type CardSuits = typeof CARD_SUITS;
type CardSuitsUnion = typeof CARD_SUITS[number];

export { CardValues, CardValuesUnion, CardSuits, CardSuitsUnion };
