import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
export class TaskDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  usuarioUuid: string;

  @IsNotEmpty()
  tarea: string;

  constructor(data?: TaskDto) {
    this.uuid = data?.uuid ?? randomUUID();
    if (data?.usuarioUuid) this.usuarioUuid = data.usuarioUuid;
    this.tarea = data?.tarea ?? '';
  }
}
