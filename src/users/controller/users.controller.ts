import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostUserDto } from '../dtos/post-user.dto';
import { UsersService } from '../service/users.service';
import { GetUserDto } from '../dtos/get-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { AuthGuard } from '../auth.guard';
import { ResponseInterceptor } from '../response.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('message')
  getHello(): string {
    return this.usersService.getHello();
  }

  @Get('user')
  @UseInterceptors(ResponseInterceptor)
  getAllUsers(): GetUserDto[] {
    return this.usersService.getUsers();
  }

  @Get('user/:uuid')
  @UseInterceptors(ResponseInterceptor)
  getUserByUuid(@Param('uuid') uuid: string): GetUserDto {
    return this.usersService.getUserByUuid(uuid);
  }

  @Post('user')
  @UseInterceptors(ResponseInterceptor)
  @UseGuards(AuthGuard)
  createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newUser: PostUserDto,
  ): GetUserDto {
    return this.usersService.createUser(newUser);
  }

  @Put('user/:uuid')
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
  updateUser(
    @Param('uuid') uuid: string,
    @Body() userUpdate: PostUserDto,
  ): GetUserDto {
    return this.usersService.updateUser(uuid, userUpdate);
  }

  @Patch('user/:uuid')
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
  updatePatchUser(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    userUpdate: PatchUserDto,
  ): GetUserDto {
    return this.usersService.updatePatchUser(uuid, userUpdate);
  }

  @Delete('user/:uuid')
  @UseGuards(AuthGuard)
  deleteUser(@Param('uuid') uuid: string): boolean {
    return this.usersService.deleteUser(uuid);
  }
}
