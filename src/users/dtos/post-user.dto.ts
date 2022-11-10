import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';
export class PostUserDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  constructor(data?: PostUserDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.name = data?.name ?? '';
    if (data?.lastName) this.lastName = data.lastName;
    this.email = data?.email ?? '';
  }
}
