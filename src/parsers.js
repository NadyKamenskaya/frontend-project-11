import uniqueId from 'lodash/uniqueId.js';

const parsers = (response) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'text/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('rssInvalid');
  } else {
    const data = {
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
      items: [],
    };
    doc.querySelectorAll('item').forEach((item) => data.items.push({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      id: uniqueId(),
    }));

    return data;
  }
};

export default parsers;
