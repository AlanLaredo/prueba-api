import { InputType, Field, ID } from '@nestjs/graphql'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose'

@InputType()
export class DeleteIDInput {
  @IsMongoId()
  @Field(type => ID)
  @IsNotEmpty()
  id: Types.ObjectId
}
