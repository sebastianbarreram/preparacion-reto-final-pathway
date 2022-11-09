import { Injectable } from '@nestjs/common';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TasksService {
  tasks: TaskDto[] = [
    {
      uuid: '1',
      usuarioUuid: '2',
      tarea: 'Historia de usuario 1',
    },
    {
      uuid: '2',
      usuarioUuid: '1',
      tarea: 'Historia de usuario 2',
    },
    {
      uuid: '3',
      usuarioUuid: '3',
      tarea: 'Historia de usuario 3',
    },
  ];
  getHello(): string {
    return 'Hola desde el servicio de Tasks';
  }
  getTasks(): TaskDto[] {
    return this.tasks;
  }
  getTaskByUuid(uuid: string): TaskDto | undefined {
    return this.tasks.find((task: TaskDto) => task.uuid == uuid);
  }
  createTask(newTask: TaskDto): TaskDto {
    this.tasks.push(newTask);
    return newTask;
  }
  updateTask(uuid: string, taskUpdate: TaskDto): TaskDto | undefined {
    const task = this.tasks.find((task: TaskDto) => task.uuid == uuid);
    if (task != undefined) {
      task.usuarioUuid = taskUpdate.usuarioUuid;
      task.tarea = taskUpdate.tarea;
    }
    return task;
  }
  updatePatchTask(uuid: string, taskUpdate: TaskDto): TaskDto | undefined {
    const task = this.tasks.find((task: TaskDto) => task.uuid == uuid);
    if (task != undefined) {
      const taskPatch: TaskDto = {
        ...task,
        ...taskUpdate,
      };
      this.tasks = this.tasks.map((task: TaskDto) => {
        return task.uuid == uuid ? taskPatch : task;
      });
      return taskPatch;
    }
    return task;
  }
  deleteTask(uuid: string): boolean {
    const taskIndex = this.tasks.findIndex(
      (user: TaskDto) => user.uuid == uuid,
    );
    if (taskIndex == -1) return false;
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
