const connection = require('./database/connection');
const express = require('express');
const cors = require('cors');

connection();

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the Music API');
});
app.use('/api/user', require('./routes/user'));
app.use('/api/song', require('./routes/song'));
app.use('/api/artist', require('./routes/artist'));
app.use('/api/album', require('./routes/album'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});