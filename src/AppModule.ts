import { Module } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { GraphQLModule } from '@nestjs/graphql';
import { getPrototypes } from '@kerthin/utils';
import { join } from 'path';

import { DBModule } from './shared/infra/database/DBModule';

const graphql = GraphQLModule.forRoot({
  typePaths: [join(__dirname, '/modules/**/infra/graphql/*.graphql')],
});

const modules = getPrototypes(`${__dirname}/modules/**/*Module{.ts,.js}`);

@Module({
  imports: [DBModule, graphql, ...modules],
})
export class AppModule {
  constructor(protected readonly orm: MikroORM) {}
}
