import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { getPrototypes } from '@kerthin/utils';

export default {
  type: 'mongo',
  clientUrl: process.env.DATABASE_URL,
  dbName: process.env.DATABASE_NAME,
  metadataProvider: TsMorphMetadataProvider,
  entities: getPrototypes(`${__dirname}/src/modules/*/domain/*{.ts,.js}`),
  // driverOptions: {
  //   connection: { ssl: { rejectUnauthorized: false } },
  // },
  // migrations: {
  //   disableForeignKeys: false,
  // },
  cache: {
    enabled: true,
    pretty: false,
    options: { cacheDir: './.mikro_orm_cache' },
  },
} as MikroOrmModuleSyncOptions;
