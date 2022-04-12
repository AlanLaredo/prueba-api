import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { Types } from 'mongoose'

import { EventLog } from 'src/common/class/event-log.abstract'

@Schema({
  collection: 'clients'
})
@ObjectType()
export class ClientEntity extends EventLog {
  @Field(() => ID)
  id?: Types.ObjectId

  @Prop({ type: String, required: true, unique: true })
  @Field(type => String, { nullable: false })
  username!: string

  @Prop({ type: String, required: true })
  @Field(type => String, { nullable: false })
  firstName!: string

  @Prop({ type: String, required: false })
  @Field(type => String, { nullable: true })
  lastName?: string

  @Prop({ type: String, required: true, unique: true})
  @Field(type => String, { nullable: false })
  email!: string

  @Prop({ type: Number, required: false })
  @Field(type => Int, { nullable: true })
  gender?: number

  @Prop({ type: String, required: false })
  @Field(type => String, { nullable: true })
  phone?: string

  @Prop({ type: String, required: false, default: 'Sin ciudad' })
  @Field(type => String, { nullable: true })
  city?: string

  @Prop({ type: Date, required: true})
  @Field(type => Date, { nullable: false })
  dateOfAdmission!: Date
}

export const ClientSchema = SchemaFactory.createForClass(ClientEntity)
