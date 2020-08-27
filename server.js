// ### The entry point of our back-end
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// Allowing to accept JSON body data
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Tasty Recipes API!' }));

// Define Routes
// '/api' is just a preference
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/bookmarks', require('./routes/bookmarks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}...`));
