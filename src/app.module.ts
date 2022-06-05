import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Users } from './components/users/entities/user.entity';
import { UsersModule } from './components/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      entities: [Users],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
