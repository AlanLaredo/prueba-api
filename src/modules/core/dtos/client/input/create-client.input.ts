import { InputType, Field, ID, Int } from '@nestjs/graphql'
import { IsArray, IsDate, IsEmail, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateClientInput {
  @IsString()
  @Field(type => String, { nullable: false })
  username!: string

  @IsString()
  @Field(type => String, { nullable: false })
  firstName!: string

  @IsOptional()
  @Field(type => String, { nullable: true })
  lastName?: string

  @IsEmail()
  @Field(type => String, { nullable: false })
  email!: string

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

  @IsDate()
  @Field(type => Date, { nullable: false })
  dateOfAdmission!: Date
}
