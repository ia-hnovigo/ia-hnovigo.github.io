const express = require('express');
const fetch = require('node-fetch');

const app = express();
const API_KEY = "9077ea544e0c4c68a5b1e2d9d3c4a9fb";

app.get('/latest-news', async (req, res) => {
  const query = req.query.q;
  const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
  const data = await response.json();
  // Filtra el resultado para coincidir con el schema del openapi.yaml
  const articles = data.articles.map(a => ({
    title: a.title,
    description: a.description,
    url: a.url
  }));
  res.json({ articles });
});

app.listen(3000, () => console.log('Server running on port 3000'));
