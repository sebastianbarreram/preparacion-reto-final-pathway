import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { randomUUID } from 'crypto';
export class ContactDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  usuarioUuid: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  apellidos?: string;

  @IsInt()
  @Min(1, { message: 'telefono should not be empty' })
  telefono: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(data?: ContactDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.usuarioUuid = data?.usuarioUuid ?? '';
    this.nombre = data?.nombre ?? '';
    if (data?.apellidos) this.apellidos = data.apellidos;
    this.telefono = data?.telefono ?? 0;
    this.email = data?.email ?? '';
  }
}
