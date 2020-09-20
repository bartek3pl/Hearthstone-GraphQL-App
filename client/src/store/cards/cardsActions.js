import CONSTANTS from './constants';

export const fetchAllCards = () => ({
  type: CONSTANTS.FETCH_ALL_CARDS_BEGIN,
});

export const fetchCard = (cardId) => ({
  type: CONSTANTS.FETCH_CARD_BEGIN,
  payload: cardId,
});

export const fetchCardsByClass = (className) => ({
  type: CONSTANTS.FETCH_CARDS_BY_CLASS_BEGIN,
  payload: className,
});

export const fetchCardsByExpansion = (expansion) => ({
  type: CONSTANTS.FETCH_CARDS_BY_EXPANSION_BEGIN,
  payload: expansion,
});
