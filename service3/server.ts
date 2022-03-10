import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db/conn'

import router from './routes';
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app: express.Application = express();
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (_req, _res) => {
  _res.send('Hello World: Expanse Tracker');
});

app.listen(PORT, HOST, () => {
  db.connectToServer((err: any) => {
    if(!err) {
      console.log(`Connected To DB`);
      console.log(`Running on http://${HOST}:${PORT}`);
    } else {
      console.error(`Server started but Error In Connecting to DB ${err}`);
    }
  })
});

