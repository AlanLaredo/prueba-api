import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ConfigModule, ConfigType } from '@nestjs/config'
import * as Joi from 'joi'


import { MongoDatabaseModule } from './common/modules/database/mongo-database.module'
import { CoreModule } from './modules/core/core.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'
import { enviroments } from './environments'


@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required()
      })
    }),
    MongoDatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      include: [CoreModule],
      autoSchemaFile: join(process.cwd(), 'pruebaApiSchema.gql'),
      path: '/graphql/pruebaApi'
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
