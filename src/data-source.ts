import { DataSource } from 'typeorm';
import { Usuario } from './entities/Usuario';
import { Rol } from './entities/Rol';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qscax123',
    database: 'bd_finanzly',
    synchronize: true,
    logging: false,
    entities: [Usuario, Rol],
});
