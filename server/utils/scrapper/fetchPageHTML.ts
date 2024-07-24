import axios from 'axios';
import axiosRetry from 'axios-retry';
import { load, type CheerioAPI } from 'cheerio';

export default async function fetchPageHTML(url: string): Promise<CheerioAPI> {
  try {
    axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
    return axios.get(url, {}).then((response) => {
      return load(response.data);
    });
  } catch (error) {
    throw new Error(`Failed to fetch content: ${error} on ${url}`);
  }
}
