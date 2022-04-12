import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CORE_MODELS } from './entities'
import { CORE_SERVICES } from './services'
import { CORE_RESOLVERS } from './resolvers'

@Module({
  imports: [
    MongooseModule.forFeature(
      [...CORE_MODELS]
    )
  ],
  controllers: [],
  providers: [
    ...CORE_SERVICES,
    ...CORE_RESOLVERS
  ]
})
export class CoreModule {}
