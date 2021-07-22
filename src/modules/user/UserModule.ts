import { HttpModule, Module } from '@nestjs/common';
import { getPrototypes, getPrototypesForDI } from '@kerthin/utils';

const resolvers = getPrototypes(`${__dirname}/infra/graphql/resolvers/*Resolver{.ts,.js}`);

const useCases = getPrototypes(`${__dirname}/use_cases/**/*UseCase{.ts,.js}`);

const gateways = getPrototypesForDI(`${__dirname}/gateways/**/*Impl{.ts,.js}`);

const repositories = getPrototypesForDI(`${__dirname}/repositories/**/*RepositoryImpl{.ts,.js}`);

@Module({
  imports: [HttpModule],
  providers: [...resolvers, ...useCases, ...gateways, ...repositories],
})
export class UserModule {}
