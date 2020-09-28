import { DataSource } from 'apollo-datasource';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users, Decks } from '../../database/dbConnectors';
import { validateLogin, validatePassword } from '../../utils/dataValidations';
import timestampToDate from '../../utils/converters';
import Constants from './constants';
import Config from '../../config';

const errorResponse = {
  success: false,
  message: Constants.ERROR,
  user: null,
};

const saltRounds = 10;

class UserAPI extends DataSource {
  async registerUser({ login, password }) {
    if (!validateLogin(login) && !validatePassword(password)) {
      return errorResponse;
    }

    if (!validateLogin(login)) {
      return {
        success: false,
        message: Constants.INVALID_LOGIN,
        user: null,
      };
    }

    if (!validatePassword(password)) {
      return {
        success: false,
        message: Constants.INVALID_PASSWORD,
        user: null,
      };
    }

    const createdDate = timestampToDate(new Date());

    const newUser = new Users({
      login,
      createdDate,
      updatedDate: createdDate,
    });

    try {
      const isLoginInDatabase = await Users.exists({ login });

      if (!isLoginInDatabase) {
        newUser.password = await bcrypt.hash(password, saltRounds);

        const {
          _id,
          login: addedLogin,
          password: cryptedPassword,
        } = await newUser.save();

        return {
          success: true,
          message: Constants.USER_SUCCESSFULLY_CREATED,
          user: {
            _id,
            login: addedLogin,
            password: cryptedPassword,
            createdDate,
            updatedDate: createdDate,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return errorResponse;
    }

    return {
      success: false,
      message: Constants.NOT_UNIQUE_LOGIN,
      user: null,
    };
  }

  async generateTokens(userId) {
    const ACCESS_TOKEN = jwt.sign(
      {
        sub: userId,
        type: 'ACCESS_TOKEN',
      },
      Config.TOKEN_SECRET_JWT,
      {
        expiresIn: 7200,
      }
    );

    const REFRESH_TOKEN = jwt.sign(
      {
        sub: userId,
        type: 'REFRESH_TOKEN',
      },
      Config.TOKEN_SECRET_JWT,
      {
        expiresIn: 10800,
      }
    );

    return {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    };
  }

  async loginUser({ login, password }) {
    try {
      const user = await Users.findOne({ login });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user?.password);

        if (isPasswordValid) {
          const { accessToken, refreshToken } = await this.generateTokens(
            user._id
          );

          return {
            success: true,
            message: Constants.USER_SUCCESSFULLY_LOGGED_IN,
            user,
            token: {
              accessToken,
              refreshToken,
            },
          };
        }

        return {
          success: false,
          message: Constants.WRONG_PASSWORD,
          user: null,
          token: null,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
        token: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        user: null,
        token: null,
      };
    }
  }

  async accessTokenVerify(authorization) {
    try {
      if (!authorization) {
        return {
          success: false,
          message: Constants.MISSING_ACCESS_TOKEN,
        };
      }

      const BEARER = 'Bearer';
      const AUTHORIZATION_TOKEN = authorization.split(' ');

      if (AUTHORIZATION_TOKEN[0] !== BEARER) {
        return {
          success: false,
          message: Constants.NOT_COMPLETE_ACCESS_TOKEN,
        };
      }

      return jwt.verify(
        AUTHORIZATION_TOKEN[1],
        Config.TOKEN_SECRET_JWT,
        (err) => {
          if (err) {
            return {
              success: false,
              message: Constants.INVALID_ACCESS_TOKEN,
            };
          }

          return {
            success: true,
            message: Constants.SUCCESSFULLY_AUTHORIZED_ACCESS_TOKEN,
          };
        }
      );
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
      };
    }
  }

  async refreshTokenVerify(refreshToken) {
    try {
      if (!refreshToken) {
        return {
          success: false,
          message: Constants.MISSING_REFRESH_TOKEN,
        };
      }

      const BEARER = 'Bearer';
      const REFRESH_TOKEN = refreshToken.split(' ');

      if (REFRESH_TOKEN[0] !== BEARER) {
        return {
          success: false,
          message: Constants.MISSING_REFRESH_TOKEN,
          token: null,
        };
      }

      return jwt.verify(
        REFRESH_TOKEN[1],
        Config.TOKEN_SECRET_JWT,
        async (verifyErr, payload) => {
          if (verifyErr) {
            return {
              success: false,
              message: Constants.INVALID_REFRESH_TOKEN,
              token: null,
            };
          }

          const user = await Users.findById(payload.sub);

          if (!user) {
            return {
              success: false,
              message: Constants.USER_DOES_NOT_EXISTS,
              token: null,
            };
          }

          const {
            accessToken,
            refreshToken: newRefreshToken,
          } = await this.generateTokens(user._id);

          return {
            success: true,
            message: Constants.SUCCESSFULLY_AUTHORIZED_REFRESH_TOKEN,
            token: {
              accessToken,
              refreshToken: newRefreshToken,
            },
          };
        }
      );
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        token: null,
      };
    }
  }

  async deleteUser(userId) {
    try {
      const user = await Users.findByIdAndRemove(userId);

      if (user) {
        return {
          success: true,
          message: Constants.USER_SUCCESSFULLY_DELETED,
          user,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return errorResponse;
    }
  }

  async editUser(userId, { login, password }) {
    try {
      const updatedDate = timestampToDate(new Date());
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const response = await Users.findByIdAndUpdate(userId, {
        login,
        password: encryptedPassword,
        updatedDate,
      });

      const editedUser = await Users.findById(userId);

      if (response && editedUser) {
        return {
          success: true,
          message: Constants.USER_SUCCESSFULLY_EDITED,
          user: editedUser,
        };
      }
      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return errorResponse;
    }
  }

  async addCardToFavourite(userId, card) {
    try {
      if (!card) {
        return {
          success: false,
          message: Constants.CARD_NOT_PROVIDED,
          user: null,
        };
      }

      const user = await Users.findById(userId);

      if (user) {
        for (const favouriteCard of user.favouriteCards) {
          if (favouriteCard.id === card.id) {
            return {
              success: false,
              message: Constants.CARD_IS_ALREADY_FAVOURITE,
              user,
            };
          }
        }

        user.favouriteCards.push(card);
        await user.save();

        return {
          success: true,
          message: Constants.SUCCESSFULLY_ADDED_CARD_TO_FAVOURITES,
          user,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        user: null,
      };
    }
  }

  async deleteCardFromFavourite(userId, card) {
    try {
      if (!card) {
        return {
          success: false,
          message: Constants.CARD_NOT_PROVIDED,
          user: null,
        };
      }

      const user = await Users.findById(userId);

      if (user) {
        const { favouriteCards } = user;
        const filteredFavouriteCards = favouriteCards.filter(
          (favouriteCard) => favouriteCard.id !== card.id
        );

        if (user.favouriteCards.length !== filteredFavouriteCards.length) {
          user.favouriteCards = filteredFavouriteCards;
          await user.save();

          return {
            success: true,
            message: Constants.SUCCESSFULLY_DELETED_CARD_FROM_FAVOURITE,
            user,
          };
        }

        return {
          success: false,
          message: Constants.CARD_NOT_FAVOURITE,
          user,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        user: null,
      };
    }
  }

  async getUserFavouriteCards(userId) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const { favouriteCards } = user;

        return {
          success: true,
          message: Constants.SUCCESSFULLY_FETCHED_FAVOURITE_CARDS,
          favouriteCards,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        favouriteCards: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        favouriteCards: null,
      };
    }
  }

  async createDeck(userId) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const createdDate = timestampToDate(new Date());

        const newDeck = new Decks({
          cards: [],
          createdDate,
          updatedDate: createdDate,
        });

        user.decks.push(newDeck);
        await user.save();

        return {
          success: true,
          message: Constants.DECK_SUCCESSFULLY_CREATED,
          deck: newDeck,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        deck: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        deck: null,
      };
    }
  }

  async deleteDeck(userId, deckId) {
    try {
      if (!deckId) {
        return {
          success: false,
          message: Constants.DECK_NOT_PROVIDED,
          decks: null,
        };
      }

      const user = await Users.findById(userId);

      if (user) {
        const { decks } = user;
        const filteredDecks = decks.filter((deck) => deck.id !== deckId);

        if (user.decks.length !== filteredDecks.length) {
          user.decks = filteredDecks;
          await user.save();

          return {
            success: true,
            message: Constants.SUCCESSFULLY_DELETED_DECK,
            decks: filteredDecks,
          };
        }

        return {
          success: false,
          message: Constants.DECK_NOT_EXISTS,
          decks: null,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        decks: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        decks: null,
      };
    }
  }

  async getUserDecks(userId) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const { decks } = user;

        return {
          success: true,
          message: Constants.SUCCESSFULLY_FETCHED_DECKS,
          decks,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        decks: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        decks: null,
      };
    }
  }

  async getUserDeck(userId, deckId) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const { decks } = user;

        for (const deck of decks) {
          if (deck.id === deckId) {
            return {
              success: true,
              message: Constants.SUCCESSFULLY_FETCHED_DECK,
              deck,
            };
          }
        }

        return {
          success: false,
          message: Constants.DECK_NOT_FOUND,
          deck: null,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        deck: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: Constants.ERROR,
        deck: null,
      };
    }
  }

  validateDeck(cards, cardToAdd) {
    const oneCardOnlyAllowedType = 'LEGENDARY';
    const isDeckComplete = cards?.length === 30;

    return {
      isDeckComplete,
      isDeckValid: true,
      deckValidationMessage: '',
    };
  }

  async addCardToDeck(userId, deckId, card) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const { decks } = user;
        let cardsCountBeforePush;
        let cardsCountAfterPush;
        let selectedCardsInDeck;

        for (const deck of decks) {
          if (deck._id.toString() === deckId) {
            cardsCountBeforePush = deck.cards.length;
            deck.cards.push(card);
            cardsCountAfterPush = deck.cards.length;
            selectedCardsInDeck = deck.cards;
            break;
          }
        }

        await user.save();

        const isMoreCardsInDeck = cardsCountBeforePush !== cardsCountAfterPush;
        const { isDeckValid, deckValidationMessage } = this.validateDeck(
          selectedCardsInDeck
        );

        if (isMoreCardsInDeck && isDeckValid) {
          return {
            success: true,
            message: Constants.SUCCESSFULLY_ADDED_CARD_TO_DECK,
            user,
          };
        }

        if (!isDeckValid) {
          return {
            success: false,
            message: deckValidationMessage,
            user: null,
          };
        }

        return {
          success: false,
          message: Constants.CARD_NOT_ADDED_TO_DECK,
          user,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return errorResponse;
    }
  }

  async deleteCardFromDeck(userId, deckId, cardId) {
    try {
      const user = await Users.findById(userId);

      if (user) {
        const { decks } = user;
        let filteredCards;
        let userCardsBeforeDelete;

        for (const deck of decks) {
          if (deck._id.toString() === deckId) {
            userCardsBeforeDelete = deck.cards.length;

            filteredCards = deck.cards.filter(
              (card) => card._id.toString() !== cardId
            );
            deck.cards = filteredCards;
            break;
          }
        }

        await user.save();

        const isLessCardsInDeck =
          filteredCards.length !== userCardsBeforeDelete;

        if (isLessCardsInDeck) {
          return {
            success: true,
            message: Constants.SUCCESSFULLY_DELETED_CARD_FROM_DECK,
            user,
          };
        }

        return {
          success: false,
          message: Constants.CARD_NOT_IN_DECK,
          user,
        };
      }

      return {
        success: false,
        message: Constants.USER_DOES_NOT_EXISTS,
        user: null,
      };
    } catch (error) {
      console.error(error);
      return errorResponse;
    }
  }
}

export default UserAPI;
