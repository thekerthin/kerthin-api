import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
  dbName: process.env.DATABASE_NAME,
  // metadataProvider: TsMorphMetadataProvider,
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
  migrations: {
    disableForeignKeys: false,
  },
  cache: {
    enabled: true,
    pretty: false,
    options: { cacheDir: './.mikro_orm_cache' },
  },
  entities: [
    __dirname + '/src/modules/react_issues/domain/ReactIssueNote{.ts,.js}',
    __dirname + '/src/shared/domain/Entity{.ts,.js}',
    __dirname + '/src/shared/domain/AggregateRoot{.ts,.js}',
  ],
} as MikroOrmModuleSyncOptions;
