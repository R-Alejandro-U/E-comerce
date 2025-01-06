/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './envs';
import { registerAs } from '@nestjs/config';

export const AppDataSource = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  dropSchema: true,
  entities: dbConfig.entities,
  migrations: dbConfig.migration,
};

export default registerAs('typeorm', () => AppDataSource);
export const conectionSource = new DataSource(
  AppDataSource as DataSourceOptions,
);
