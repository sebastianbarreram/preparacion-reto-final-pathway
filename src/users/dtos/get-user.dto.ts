import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';
export class GetUserDto implements UserInterface {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

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
}
