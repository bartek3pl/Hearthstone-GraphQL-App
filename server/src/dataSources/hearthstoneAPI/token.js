import { ClientCredentials } from 'simple-oauth2';

require('dotenv').config();

const credentials = {
  client: {
    id: process.env.HEARTHSTONE_API_CLIENT_ID,
    secret: process.env.HEARTHSTONE_API_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://eu.battle.net/',
  },
};

const getToken = async () => {
  const client = new ClientCredentials(credentials);
  let token;

  try {
    token = await client.getToken();
  } catch (error) {
    console.error('Access Token Error', error.message);
  }

  return token;
};

export default getToken;
