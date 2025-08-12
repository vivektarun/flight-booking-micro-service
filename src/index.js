const express = require('express');
const amqplib = require('amqplib');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue('noti-quque');
        setInterval(() => {
            channel.sendToQueue("noti-queue", Buffer.from("Something to do"));
        }, 1000);
    } catch (error) {
        console.log;
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes'); // By default index.js is required.
const CRON = require('./utils/common/cron-jobs'); // By default index.js is required.

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());

app.get('/', (req, res) => {
    res.send("service is up");
});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server running on http://localhost:${ServerConfig.PORT}`);
    CRON();
    await connectQueue();
})