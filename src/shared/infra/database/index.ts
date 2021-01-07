import { createConnection, getConnectionOptions, getConnection } from 'typeorm';

createConnection('teste').then((resp) => console.log(getConnection('teste').isConnected));

getConnectionOptions('teste').then((resp) => console.log(resp));
