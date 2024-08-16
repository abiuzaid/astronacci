const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL frontend Anda
  credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const videoRoutes = require('./routes/videos');

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/videos', videoRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Function to read JSON files (optional usage example)
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
};

// Example usage
const articles = readJsonFile('articles.json');
const videos = readJsonFile('videos.json');

console.log('Articles:', articles);
console.log('Videos:', videos);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
