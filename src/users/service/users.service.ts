import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  users: UserDto[] = [
    {
      uuid: '1',
      nombre: 'Sebastian',
      apellido: 'Barrera',
      email: 'sbarrera@sofka.com',
    },
    {
      uuid: '2',
      nombre: 'Diana',
      apellido: 'Marin',
      email: 'dmarin@sofka.com',
    },
    {
      uuid: '3',
      nombre: 'Ramiro',
      apellido: 'Ruiz',
      email: 'rruiz@sofka.com',
    },
  ];
  getHello(): string {
    return 'Hola desde el servicio de Users';
  }
  getUsers(): UserDto[] {
    return this.users;
  }
  getUserByUuid(uuid: string): UserDto | undefined {
    return this.users.find((user: UserDto) => user.uuid == uuid);
  }
  createUser(newUser: UserDto): UserDto {
    this.users.push(newUser);
    return newUser;
  }
  updateUser(uuid: string, userUpdate: UserDto): UserDto | undefined {
    const user = this.users.find((user: UserDto) => user.uuid == uuid);
    if (user != undefined) {
      user.nombre = userUpdate.nombre;
      user.apellido = userUpdate.apellido;
      user.email = userUpdate.email;
    }
    return user;
  }
  updatePatchUser(uuid: string, userUpdate: UserDto): UserDto | undefined {
    const user = this.users.find((user: UserDto) => user.uuid == uuid);
    if (user != undefined) {
      const userPatch: UserDto = {
        ...user,
        ...userUpdate,
      };
      this.users = this.users.map((user: UserDto) => {
        return user.uuid == uuid ? userPatch : user;
      });
      return userPatch;
    }
    return user;
  }
  deleteUser(uuid: string): boolean {
    const userIndex = this.users.findIndex(
      (user: UserDto) => user.uuid == uuid,
    );
    if (userIndex == -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }
}
