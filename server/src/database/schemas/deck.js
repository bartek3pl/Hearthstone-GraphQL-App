import mongoose from 'mongoose';
import card from './card';

const deck = new mongoose.Schema({
  cards: [card],
  createdDate: {
    type: String,
    required: false,
  },
  updatedDate: {
    type: String,
    required: false,
  },
});

const Decks = mongoose.model('decks', deck);

export { deck };
export default Decks;
