const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000 ;
require('dotenv').config();
const logger = require('./helpers/logger');
const routeHandler = require('./routes/index')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Blood Guard API SERVICE')
})

app.use('/api', routeHandler)

app.listen(port, () => {
    logger.info(`Server listening at  http://localhost:${port}`)
})