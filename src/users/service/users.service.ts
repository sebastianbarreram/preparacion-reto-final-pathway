import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetUserDto } from '../dtos/get-user.dto';
import { PostUserDto } from '../dtos/post-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: GetUserDto[] = [
    {
      uuid: '1',
      name: 'Sebastian',
      lastName: 'Barrera',
      email: 'sbarrera@sofka.com',
    },
    {
      uuid: '2',
      name: 'Diana',
      lastName: 'Marin',
      email: 'dmarin@sofka.com',
    },
    {
      uuid: '3',
      name: 'Ramiro',
      email: 'rruiz@sofka.com',
    },
  ];
  getHello(): string {
    return 'Hola desde el servicio de Users';
  }
  getUsers(): GetUserDto[] {
    return this.users;
  }
  getUserByUuid(uuid: string): GetUserDto {
    const user = this.users.find((user: GetUserDto) => user.uuid == uuid);
    if (user == undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  createUser(newUser: PostUserDto): GetUserDto {
    const newGetUserDto: GetUserDto = {
      uuid: uuid(),
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
    };
    this.users.push(newGetUserDto);
    return newGetUserDto;
  }
  updateUser(uuid: string, userUpdate: PostUserDto): GetUserDto {
    const user = this.users.find((user: GetUserDto) => user.uuid == uuid);
    if (user == undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    user.name = userUpdate.name;
    user.lastName = userUpdate.lastName;
    user.email = userUpdate.email;
    return user;
  }
  updatePatchUser(uuid: string, userUpdate: PostUserDto): GetUserDto {
    const user = this.users.find((user: PostUserDto) => user.uuid == uuid);
    if (user == undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const userPatch: GetUserDto = {
      ...user,
      ...userUpdate,
    };
    this.users = this.users.map((user: GetUserDto) => {
      return user.uuid == uuid ? userPatch : user;
    });
    return userPatch;
  }
  deleteUser(uuid: string): boolean {
    const userIndex = this.users.findIndex(
      (user: PostUserDto) => user.uuid == uuid,
    );
    if (userIndex == -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }
}
