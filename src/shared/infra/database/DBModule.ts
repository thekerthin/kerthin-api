import { MikroOrmModule } from '@mikro-orm/nestjs';

import mikroOrmConfig from '../../../../mikro-orm.config';

export const DBModule = MikroOrmModule.forRoot(mikroOrmConfig);
