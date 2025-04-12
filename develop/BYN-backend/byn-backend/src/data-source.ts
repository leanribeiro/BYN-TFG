import { DataSource } from 'typeorm';
import config from './config/database';
import { Usuario } from './models/usuario.entity';
import { Rutina } from './models/rutina.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: true,
  logging: false,
  entities: [Usuario,Rutina],
  subscribers: [],
});

export default dataSource;
