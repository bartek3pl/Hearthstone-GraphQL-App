import { RESTDataSource } from 'apollo-datasource-rest';

const convertRarityIdToRarityName = (rarityId) => {
  const rarities = {
    1: 'COMMON',
    2: 'HERO',
    3: 'RARE',
    4: 'EPIC',
    5: 'LEGENDARY',
  };
  return rarities[rarityId] || 'UNKNOWN';
};

const convertClassIdToClassName = (classId) => {
  const classNames = {
    2: 'DRUID',
    3: 'HUNTER',
    4: 'MAGE',
    5: 'PALADIN',
    6: 'PRIEST',
    7: 'ROGUE',
    8: 'SHAMAN',
    9: 'WARLOCK',
    10: 'WARRIOR',
    14: 'DEMON_HUNTER',
  };
  return classNames[classId] || 'UNKNOWN';
};

const cardReducer = ({
  id,
  name,
  text,
  classId,
  attack,
  health,
  image,
  imageGold,
  rarityId,
  manaCost,
}) => ({
  id,
  name,
  text,
  className: convertClassIdToClassName(classId),
  attack,
  health,
  image,
  imageGold,
  rarity: convertRarityIdToRarityName(rarityId),
  manaCost,
});

const reduceCards = (cards) =>
  Array.isArray(cards) ? cards.map((card) => cardReducer(card)) : [];

const convertEnumToMatchAPI = (field) =>
  field
    .toLowerCase()
    .split('_')
    .join('-')
    .split("'")
    .join('')
    .split('AND')
    .join('&');

class HearthstoneAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://eu.api.blizzard.com/hearthstone/';
  }

  async getCards(token) {
    const { cards } = await this.get(
      `cards?locale=en_US&access_token=${token}`
    );
    return reduceCards(cards);
  }

  async getCard(token, { id }) {
    const card = await this.get(
      `cards/${id}?locale=en_US&access_token=${token}`
    );
    return cardReducer(card);
  }

  async getCardsByClassName(token, { className }) {
    const convertedClassName = convertEnumToMatchAPI(className);
    const { cards } = await this.get(
      `cards?locale=en_US&class=${convertedClassName}&access_token=${token}`
    );
    return reduceCards(cards);
  }

  async getCardsByExpansion(token, { expansion }) {
    const convertedExpansion = convertEnumToMatchAPI(expansion);
    const { cards } = await this.get(
      `cards?locale=en_US&set=${convertedExpansion}&access_token=${token}`
    );
    return reduceCards(cards);
  }
}

export default HearthstoneAPI;
