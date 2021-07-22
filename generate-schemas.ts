import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/modules/**/infra/graphql/*.graphql'],
  path: join(process.cwd(), 'src/generated/schemas.ts'),
  outputAs: 'class',
});
