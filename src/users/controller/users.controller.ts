import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('message')
  getHello(): string {
    return this.usersService.getHello();
  }

  @Get('user')
  getAllUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Get('user/:uuid')
  getUserByUuid(@Param('uuid') uuid: string): UserDto | undefined {
    return this.usersService.getUserByUuid(uuid);
  }

  @Post('user')
  createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newUser: UserDto,
  ): UserDto {
    return this.usersService.createUser(newUser);
  }

  @Put('user/:uuid')
  updateUser(@Param('uuid') uuid: string, @Body() userUpdate: UserDto) {
    return this.usersService.updateUser(uuid, userUpdate);
  }

  @Patch('user/:uuid')
  updatePatchUser(@Param('uuid') uuid: string, @Body() userUpdate: UserDto) {
    return this.usersService.updatePatchUser(uuid, userUpdate);
  }

  @Delete('user/:uuid')
  deleteUser(@Param('uuid') uuid: string): boolean {
    return this.usersService.deleteUser(uuid);
  }
}
