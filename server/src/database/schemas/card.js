import { Schema } from 'mongoose';

const card = new Schema({
  id: { type: Number },
  name: { type: String },
  text: { type: String },
  className: { type: String },
  attack: { type: Number },
  health: { type: Number },
  image: { type: String },
  imageGold: { type: String },
  manaCost: { type: Number },
  rarity: { type: String },
});

export default card;
