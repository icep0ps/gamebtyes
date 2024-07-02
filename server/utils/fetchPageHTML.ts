import { load, type CheerioAPI } from 'cheerio';

export default async function fetchPageHTML(url: string): Promise<CheerioAPI> {
  try {
    const response = await fetch(url);
    const content = await response.text();
    return load(content);
  } catch (error) {
    throw new Error(`Failed to fetch content: ${error}`);
  }
}
