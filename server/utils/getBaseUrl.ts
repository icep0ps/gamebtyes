export default function getBaseUrl(link: string) {
  const BASE_URL_PATTERN = new RegExp(/^.+?[^\/:](?=[?\/]|$)/);
  const BASE_URL = BASE_URL_PATTERN.exec(link);
  if (BASE_URL) return BASE_URL[0];
  else throw new Error('Could not get base URL');
}
