export enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
  HERO,
  UNKNOWN,
}

export enum ClassName {
  MAGE,
  ROGUE,
  WARRIOR,
  WARLOCK,
  DEMON_HUNTER,
  HUNTER,
  DRUID,
  PRIEST,
  PALADIN,
  SHAMAN,
  UNKNOWN,
}

export interface Card {
  _id?: string;
  id?: number;
  name: string;
  text: string;
  className: ClassName;
  attack: number;
  health: number;
  image: string;
  imageGold?: string;
  manaCost: number;
  rarity: Rarity;
}
