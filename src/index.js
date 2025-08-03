const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes'); // By default index.js in required.

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());

app.get('/', (req, res) => {
    res.send("service is up");
});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running on http://localhost:${ServerConfig.PORT}`)
})