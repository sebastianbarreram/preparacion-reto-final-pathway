import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { HttpBodyMiddleware } from './http-body.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpBodyMiddleware)
      .forRoutes(
        { path: 'users/user/:uuid', method: RequestMethod.PUT },
        { path: 'users/user', method: RequestMethod.POST },
      );
  }
}
