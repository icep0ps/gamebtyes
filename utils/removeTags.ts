const removeTags = (text: string) => {
  if (text === null || text === '') return false;
  else text = text.toString();
  return text.replace(/(<([^>]+)>)/gi, '');
};

export default removeTags;
