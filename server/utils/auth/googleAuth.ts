import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client({
  clientId: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  redirectUri: process.env['GOOGLE_CLIENT_REDIRECT_URL'],
});

export default oAuth2Client;
