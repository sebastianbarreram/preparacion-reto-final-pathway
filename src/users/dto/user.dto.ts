import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';
export class UserDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  apellido?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(data?: UserDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.nombre = data?.nombre ?? '';
    if (data?.apellido) this.apellido = data.apellido;
    this.email = data?.email ?? '';
  }
}
