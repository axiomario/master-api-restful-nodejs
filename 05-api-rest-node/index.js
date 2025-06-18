const { connection } = require('./database/connection.js');
const express = require('express');
const cors = require('cors');

connection();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to the API REST with Node.js and MongoDB');
});

app.use('/api/articles', require('./routes/article.js'));

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});