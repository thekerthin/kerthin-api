import { HttpModule, Module } from '@nestjs/common';
import { getPrototypes, getPrototypesForDI } from '@kerthin/utils';

const routes = getPrototypes(`${__dirname}/infra/http/routes/*{.ts,.js}`);

const useCases = getPrototypes(`${__dirname}/use_cases/**/*UseCase{.ts,.js}`);

const gateways = getPrototypesForDI(`${__dirname}/gateways/**/*Impl{.ts,.js}`);

const repositories = getPrototypesForDI(
  `${__dirname}/repositories/**/*RepositoryImpl{.ts,.js}`,
);

@Module({
  imports: [HttpModule],
  controllers: [...routes],
  providers: [...useCases, ...gateways, ...repositories],
})
export class UserModule {}
