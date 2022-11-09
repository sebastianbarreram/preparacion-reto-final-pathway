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
import { TaskDto } from '../dto/task.dto';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('message')
  getHello(): string {
    return this.tasksService.getHello();
  }

  @Get('task')
  getAllTasks(): TaskDto[] {
    return this.tasksService.getTasks();
  }

  @Get('task/:uuid')
  getTaskByUuid(@Param('uuid') uuid: string): TaskDto | undefined {
    return this.tasksService.getTaskByUuid(uuid);
  }

  @Post('task')
  createTask(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newTask: TaskDto,
  ): TaskDto {
    return this.tasksService.createTask(newTask);
  }

  @Put('task/:uuid')
  updateTask(@Param('uuid') uuid: string, @Body() taskUpdate: TaskDto) {
    return this.tasksService.updateTask(uuid, taskUpdate);
  }

  @Patch('task/:uuid')
  updatePatchTask(@Param('uuid') uuid: string, @Body() taskUpdate: TaskDto) {
    return this.tasksService.updatePatchTask(uuid, taskUpdate);
  }

  @Delete('task/:uuid')
  deleteTask(@Param('uuid') uuid: string): boolean {
    return this.tasksService.deleteTask(uuid);
  }
}
