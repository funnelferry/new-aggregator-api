const axios = require('axios');

async function fetchNewsByCategory(categories) {
  try {
    const categoryQueries = categories.map(category => `category=${category}`).join('&');
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?${categoryQueries}&apiKey=${process.env.NEWS_API}`);
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { fetchNewsByCategory };