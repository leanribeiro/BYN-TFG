import { DataSource } from 'typeorm';
import config from './config/database';
import { Usuario } from './models/usuario.entity';
import { Rutina } from './models/rutina.entity';
import { RutinaVersionada } from './models/rutina-versionada.entity';
import { Ejercicio } from './models/ejercicio.entity';
import { Progreso } from './models/progreso.entity';
import { RutinaDia } from './models/rutina-dia.entity';
import { RutinaEjercicio } from './models/rutina-ejercicio.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: true,
  logging: false,
  entities: [Usuario,Rutina,RutinaVersionada,Ejercicio,Progreso, Rutina,RutinaDia,RutinaEjercicio
  ],
  subscribers: [],
});

export default dataSource;
