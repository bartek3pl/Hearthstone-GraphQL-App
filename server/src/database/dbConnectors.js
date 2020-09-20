import mongoose from 'mongoose';
import Users from './schemas/user';
import Decks from './schemas/deck';
import Config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect(Config.URI_MONGO);

export { Users, Decks };
