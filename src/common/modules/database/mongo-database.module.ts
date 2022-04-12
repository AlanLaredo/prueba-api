import { Module, Global } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoClient } from 'mongodb'

import config from '../../../config'

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
          hostReplicate,
          pathToCaCert
        } = configService.mongo

        const uri = `${connection}://${user}:${encodeURIComponent(password)}@${host}/admin?authSource=admin&replicaSet=${hostReplicate}&tsl=true&tlsCAFile=${pathToCaCert}`
  
        return {
          uri,
          user,
          pass: password,
          dbName,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          tlsInsecure: true,
          ssl: true,
          tlsCAFile: pathToCaCert
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
          hostReplicate,
          pathToCaCert
        } = configService.mongo
        const uri = `${connection}://${user}:${encodeURIComponent(password)}@${host}/admin?authSource=admin&replicaSet=${hostReplicate}&tsl=true&tlsCAFile=${pathToCaCert}`

        const client = new MongoClient(uri, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          ssl: true,
          tlsInsecure: true,
          tlsCAFile: pathToCaCert
        })

        await client.connect()

        const db = client.db(dbName)
        return db
      },
      inject: [config.KEY]
    }
  ],
  exports: ['MONGO', MongooseModule]
})
export class MongoDatabaseModule {}
