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
