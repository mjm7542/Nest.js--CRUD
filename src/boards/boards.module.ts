import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]), // 내가 찾은 커스텀 데코레이터를 사용한 레포지토리
    TypeOrmModule.forFeature([BoardRepository]), // 강의에서 알려준 기존 거 일단 남겨둠
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule { }

// NestJS의 모듈 시스템은 계층적이고 독립적입니다. 
// AppModule에서 어떤 모듈을 임포트하는 것은 애플리케이션의 최상위 레벨에서 해당 모듈을 사용하겠다는 것을 의미합니다. 
// 그러나 각 개별 모듈 내에서는 다른 모듈의 서비스나 기능을 사용하려면 해당 모듈을 직접 임포트해야 합니다.