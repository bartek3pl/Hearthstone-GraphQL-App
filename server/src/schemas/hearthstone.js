import { gql } from 'apollo-server';

const typeDefs = gql`
  enum Rarity {
    COMMON
    RARE
    EPIC
    LEGENDARY
    HERO
    UNKNOWN
  }

  enum ClassName {
    MAGE
    ROGUE
    WARRIOR
    WARLOCK
    DEMON_HUNTER
    HUNTER
    DRUID
    PRIEST
    PALADIN
    SHAMAN
    UNKNOWN
  }

  enum Expansion {
    RISE_OF_SHADOWS
    SAVIORS_OF_ULDUM
    DESCENT_OF_DRAGONS
    ASHES_OF_OUTLAND
    SCHOLOMANCE_ACADEMY
    GOBLINES_VS_GNOMES
    THE_GRAND_TOURNAMENT
    WHISPERS_OF_THE_OLD_GODS
    MEAN_STREETS_OF_GADGETZAN
    JOURNEY_TO_UNGORO
    KNIGHTS_OF_THE_FROZEN_THRONE
    KOBOLDS_AND_CATACOMBS
    THE_WITCHWOOD
    THE_BOOMSDAY_PROJECT
    RASTAKHANS_RUMBLE
  }

  type Card {
    _id: ID!
    id: Int!
    name: String
    text: String
    className: ClassName!
    attack: Int
    health: Int
    image: String!
    imageGold: String
    manaCost: Int
    rarity: Rarity!
  }
`;

export default typeDefs;
