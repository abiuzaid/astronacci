const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
};


router.get('/', (req, res) => {
  try {
    const articles = readJsonFile('articles.json');
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

module.exports = router;
