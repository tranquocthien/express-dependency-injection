import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import './core/utils/responses/success';
import './core/utils/responses/error';

import application from './application';
import * as http from 'http';
import { AppDataSource } from './db/index';

AppDataSource.initialize()
  .then(() => {
    console.log('Database is connected');
  })
  .catch((error) => console.log(error.message));

const PORT = process.env.PORT || 4000;
const server = http.createServer(application.instance);
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
