import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Users } from './components/users/entities/user.entity';
import { UsersModule } from './components/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './components/books/books.module';
import { Books } from './components/books/entities/book.entity';
import { AuthModule } from './components/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      entities: [Users, Books],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
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
