/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'

@Injectable()
export class MainService<T> {
  MainModel: Model<any>;
  constructor (MainModel: Model<T>) {
    this.MainModel = MainModel
  }

  public async get (data: any = {}): Promise<T[]> {
    if (data.id) {
      data._id = data.id
      delete data.id
    }
    return this.MainModel.find({
      ...data,
      deletedAt: null
    }).exec()
  }

  public async getOne (data: any = {}): Promise<T> {
    if (data.id) {
      data._id = data.id
      delete data.id
    }
    return this.MainModel.findOne({
      ...data,
      deletedAt: null
    }).exec()
  }

  public async find (data: any = {}): Promise<T[]> {
    const filters: any = {}
    Object.keys(data)
      .map(key => {
        filters[key] = {
          $regex: data[key].toLowerCase(),
          $options: 'i'
        }
        return null
      })
    return this.MainModel.find({
      ...filters,
      deletedAt: null
    }).exec()
  }

  public async getById (id: Types.ObjectId): Promise<T> {
    return this.MainModel.findById(
      id
    ).exec()
  }

  public async getByIds (ids: Types.ObjectId[]): Promise<T[]> {
    return this.MainModel.find()
      .where('_id')
      .in(ids)
      .exec()
  }

  public async create (data: T): Promise<T> {
    return new this.MainModel({
      ...data
    }).save()
  }

  public async update (data: any): Promise<T> {
    const { id, ...rowData } = data
    return this.MainModel.findByIdAndUpdate(
      id, {
        $set: rowData
      },
      { new: true }).exec()
  }

  public async delete (data: any): Promise<T> {
    const { id, ...rowData } = data
    return this.MainModel.findByIdAndUpdate(
      id, {
        $set: rowData
      },
      { new: true }).exec()
  }
}
