import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { UserRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // AuthGuard()의 기본값 'jwt' 설정
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // 기존 express에서 사용하던 시크릿키
      signOptions: {
        expiresIn: jwtConfig.expiresIn // 토큰 시간 설정  
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
