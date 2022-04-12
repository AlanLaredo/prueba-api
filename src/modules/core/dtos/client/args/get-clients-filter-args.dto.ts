import { ArgsType, Field, ID, Int } from '@nestjs/graphql'
import { IsDate, IsEmail, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

@ArgsType()
export class GetClientsFilterArgs {
  @IsOptional()
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  id?: Types.ObjectId

  @IsOptional()
  @IsString()
  @Field(type => String, { nullable: true })
  username?: string

  @IsOptional()
  @IsString()
  @Field(type => String, { nullable: true })
  firstName?: string

  @IsOptional()
  @Field(type => String, { nullable: true })
  lastName?: string

  @IsOptional()
  @IsEmail()
  @Field(type => String, { nullable: true })
  email?: string

  @IsOptional()
  @IsNumber()
  @Field(type => Int, { nullable: true })
  gender?: number

  @IsOptional()
  @IsString()
  @Field(type => String, { nullable: true })
  phone?: string

  @IsOptional()
  @IsString()
  @Field(type => String, { nullable: true })
  city?: string

  @IsOptional()
  @IsDate()
  @Field(type => Date, { nullable: true })
  dateOfAdmission?: Date
}
