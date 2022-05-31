import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.body['user'] = this.authService.decodeToken(
        tokenArray.split(' ')[1],
      ).user;
    }

    return next.handle().pipe();
  }
}
