import mongoose from 'mongoose';
import card from './card';
import { deck } from './deck';

const users = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: String,
    required: false,
  },
  updatedDate: {
    type: String,
    required: false,
  },
  favouriteCards: [card],
  decks: [deck],
});

const Users = mongoose.model('users', users);

export default Users;
