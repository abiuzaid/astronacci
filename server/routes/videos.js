const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const videosFilePath = path.join(__dirname, '../data/videos.json');

router.get('/', (req, res) => {
  fs.readFile(videosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading videos file:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    const videos = JSON.parse(data);
    res.status(200).json(videos);
  });
});

router.get('/:id', (req, res) => {
  const videoId = parseInt(req.params.id, 10);

  fs.readFile(videosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading videos file:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    const videos = JSON.parse(data);
    const video = videos.find(v => v.id === videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  });
});

module.exports = router;
