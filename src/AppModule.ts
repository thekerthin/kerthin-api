import { Module, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { getPrototypes } from '@kerthin/utils';

import { DBModule } from './shared/infra/database/DBModule';

const modules = getPrototypes(`${__dirname}/modules/**/*Module{.ts,.js}`);

@Module({
  imports: [DBModule, ...modules],
})
export class AppModule implements OnModuleInit {
  constructor(protected readonly orm: MikroORM) {}

  async onModuleInit() {
    const migrator = this.orm.getMigrator();
    await migrator.up();
  }
}
