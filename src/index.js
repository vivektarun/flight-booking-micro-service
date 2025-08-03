const express = require('express');
const PORT = 3002

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());

app.get('/', (req, res) => {
    res.send("service is up");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})