import { Card } from './Card';
import { Deck } from './Deck';

export interface User {
  _id: string;
  login: string;
  password: string;
  createdDate: string;
  updatedDate: string;
  favouriteCards: Array<Card>;
  decks: Array<Deck>;
}
