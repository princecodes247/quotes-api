import express from 'express';
import bodyParser from 'body-parser';
import { client } from './database';
import quotesRouter from './routes';


const app = express();
const port = 3000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Active ⚡️');
});

app.use('/quotes', quotesRouter);

client.connect().then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})
