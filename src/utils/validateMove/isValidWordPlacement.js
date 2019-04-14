import indexToRowCol from '../board/indexToRowCol';
import isWordConnected from './isWordConnected';
import getPerpendicularWordIndices from './getPerpendicularWordIndices';

const isValidFormPlacement = (tiles, boardSize, placedTilesIndices, dictionary) => {
  // are there any letters placed by the player?
  if (placedTilesIndices.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Place some letters!'
    };
  }

  // are all letters in the same row or column?
  const rows = new Set([]);
  const cols = new Set([]);
  placedTilesIndices.forEach(i => {
    const {row, col} = indexToRowCol(i, boardSize)
    rows.add(row);
    cols.add(col);
  });

  if (rows.size > 1 && cols.size > 1) {
    return {
      isValid: false,
      errorMessage: 'All letters must be placed in the same row or column'
    };
  }

  // do all placed letters form a continious sequence?
  let step = 0;
  let stepAllWords = 0;
  if (rows.size === 1) {
    step = 1;
    stepAllWords = boardSize;
  }
  if (cols.size === 1) {
    step = boardSize;
    stepAllWords = 1;
  }

  const placedWordIndices = [];
  for (let i = placedTilesIndices[0]; i < placedTilesIndices[placedTilesIndices.length-1] + step; i += step) {
    if (tiles[i].letter === null || tiles[i].letter === undefined) {
      return {
        isValid: false,
        errorMessage: 'there are gaps in the letter sequence'
      };         
    }
    placedWordIndices.push(i);
  }

  // is word connected
  const isConnected = isWordConnected(placedTilesIndices, step, stepAllWords, tiles);
  if (isConnected === false) {
    return {
      isValid: false,
      errorMessage: 'Sorry, word not connected'
    };
  }

  // get all formed words
  const wordIndices = [placedWordIndices];
  placedTilesIndices.forEach(i => {
    const word = getPerpendicularWordIndices(i, stepAllWords, tiles);
    if (word.length > 0) {
      wordIndices.push(word);
    }
  });

  // validate all words
  const invalidWords = [];
  wordIndices.forEach(wi => {
    const word = wi.map(i => tiles[i].letter.letter).join('').toLowerCase();
    const isValid = word in dictionary;
    if (isValid === false) {
      invalidWords.push(word);
    }
  });

  if (invalidWords.length > 0) {
    return {
      isValid: false,
      errorMessage: invalidWords
    };
  }

  return {
    isValid: true,
    errorMessage: null
  }
}

export default isValidFormPlacement;