import { Prop, Schema } from '@nestjs/mongoose'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Types } from 'mongoose'
import * as mongoose from 'mongoose'
@Schema()
@ObjectType()
export abstract class EventLog {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  // @Field(Type => ID, { nullable: true })
  // createdBy?: Types.ObjectId

  @Prop({ required: true })
  @Field(type => Date, { nullable: true })
  createdAt?: Date

  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  // @Field(Type => ID, { nullable: true })
  // modifiedBy?: Types.ObjectId

  @Prop({ required: false })
  @Field(type => Date, { nullable: true })
  modifiedAt?: Date

  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  // @Field(Type => ID, { nullable: true })
  // deletedBy?: Types.ObjectId

  @Prop({ required: false })
  @Field(type => Date, { nullable: true })
  deletedAt?: Date
}
