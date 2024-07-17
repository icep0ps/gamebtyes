import axios from 'axios';
import { GoogleInfo } from '../../../types';

export default async function getUserData(access_token: string) {
  const data = await axios
    .get<GoogleInfo>(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )
    .then((res) => res.data);

  return data;
}
