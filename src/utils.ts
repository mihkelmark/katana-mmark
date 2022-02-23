import { CardValuesUnion, CardSuitsUnion } from './types';

export const determineCardCode = (value: CardValuesUnion, suit: CardSuitsUnion) => {
  let valueLetter;
  const suitLetter = suit[0];

  if (value.length >= 3) {
    valueLetter = value[0];
  } else {
    valueLetter = value;
  }

  return `${valueLetter}${suitLetter}`;
};

export const shuffleArray = (arr: Array<any>) => {
  /*
   * Fisher–Yates shuffle
   */

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
};
