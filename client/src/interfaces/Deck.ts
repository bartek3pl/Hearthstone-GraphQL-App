import { Card } from './Card';

export interface Deck {
  _id: string;
  cards: Array<Card>;
}
