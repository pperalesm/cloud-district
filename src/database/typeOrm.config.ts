import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { CustomTypeOrmLogger } from '../shared/util/custom-typeorm.logger';
import { SnakeNamingStrategy } from '../shared/util/snake-naming.strategy';
import { Club } from '../modules/clubs/club.entity';
import { Player } from '../modules/players/player.entity';
import { Coach } from '../modules/coaches/coach.entity';

config();

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: ['query', 'warn'],
  logger: new CustomTypeOrmLogger(),
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['src/database/migrations/*.js'],
  entities: [Club, Player, Coach],
} as DataSourceOptions;

export default new DataSource(dataSourceOptions);
