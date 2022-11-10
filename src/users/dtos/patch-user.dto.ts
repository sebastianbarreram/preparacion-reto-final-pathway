import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';
export class PatchUserDto implements UserInterface {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;
}
