/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ClientEntity } from '../entities'
import { MainService } from './main.service'

@Injectable()
export class ClientService extends MainService<ClientEntity> {
  constructor (
    @InjectModel(ClientEntity.name) public MainModel: Model<ClientEntity>
  ) {
    super(MainModel)
  }
}
