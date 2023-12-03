import removeTags from './removeTags';

const options = {
  method: 'POST',
  url: 'https://api.ai21.com/studio/v1/summarize',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer ' + process.env.SUMMARIZE_API_KEY,
  },
};

const summarize = async (text: string) => {
  const sanitaized = removeTags(text);

  return fetch('https://api.ai21.com/studio/v1/summarize', {
    ...options,
    body: JSON.stringify({
      sourceType: 'TEXT',
      source: sanitaized,
    }),
  })
    .then((response) => response.json())
    .then((response) => response.summary)
    .catch((err) => console.error(err));
};

export default summarize;
