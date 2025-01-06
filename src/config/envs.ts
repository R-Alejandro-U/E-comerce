import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const data = process.env;

//! Configuracion del puerto;

export const PORT: number | string = data.PORT ? parseInt(data.PORT, 10) : 3000;

//! Configuraciones de las entradas de la data base;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DB_TYPE: any = data.DB_TYPE ?? 'postgres';
const DB_HOST: string | undefined = data.DB_HOST;
const DB_PORT: number | undefined = data.DB_PORT
  ? parseInt(data.DB_PORT, 10)
  : 5432;
const DB_USERNAME: string | undefined = data.DB_USERNAME;
const DB_PASSWORD: string | undefined = data.DB_PASSWORD;
const DB_NAME: string | undefined = data.DB_NAME;
const DB_SYNCHRONIZE: boolean | undefined = data.DB_SYNCHRONIZE
  ? data.DB_SYNCHRONIZE === 'true'
  : true;
const DB_LOGGING: boolean | undefined = data.DB_LOGGING
  ? data.DB_LOGGING === 'true'
  : true;
const DB_ENTITIES: string[] | undefined = data.DB_ENTITIES
  ? !data.DB_ENTITIES.includes(', .')
    ? data.DB_ENTITIES.split(',').map((path) => path.trim())
    : [data.DB_ENTITIES.trim()]
  : ['./dist/**/*.entity{.ts, .js}'];
const DB_DROPSCHEMA: boolean | undefined = data.DB_DROPSCHEMA
  ? data.DB_DROPSCHEMA === 'true'
  : false;
const DB_MIGRATION: string[] | undefined = data.DB_MIGRATION
  ? !data.DB_MIGRATION.includes(', .')
    ? data.DB_MIGRATION.split(',').map((path) => path.trim())
    : [data.DB_MIGRATION.trim()]
  : ['./dist/**/*.migration{.ts, .js}'];

export const dbConfig = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNCHRONIZE,
  logging: DB_LOGGING,
  entities: DB_ENTITIES,
  dropSchema: DB_DROPSCHEMA,
  migration: DB_MIGRATION,
};

//! configuracion para encriptar contraseñas

export const SALT: number | undefined = parseInt(data.SALT ?? '10', 10);

//! configuración de cloudinary

const CLOUD_NAME: string | undefined = data.CLOUD_NAME;
const API_KEY: string | undefined = data.API_KEY;
const API_SECRET: string | undefined = data.API_SECRET;

export const cloudinaryConfig = {
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
};

//! configuración de la palabra secreta shhhhhhhhhh

export const SECRET_WORD = data.SECRET_WORD;
