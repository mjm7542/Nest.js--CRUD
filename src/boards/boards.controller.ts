import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.dacorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) { }

  //   @Get('/')
  //   getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  //   }

  @Get()
  getAllBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user)
  }

  //   @Post()
  //   @UsePipes(ValidationPipe) // 핸들러 레벨의 벨리데이션 파이프
  //   createBoard(
  //     @Body() createBoardDto: CreateBoardDto // 벨리데이션 확인을 위해 만든 Dto에 데코레이터 추가 
  //   ): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }

  @Post()
  @UsePipes(ValidationPipe)

  createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board.
      Payload ${JSON.stringify(createBoardDto)}`)
    return this.boardsService.createBoard(createBoardDto, user)
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number
  ): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //   @Get('/:id')
  //   getBoardById(@Param('id') id: string
  //   ): Board {
  //     return this.boardsService.getBoardById(id)
  //   }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user)
  }

  //   @Delete('/:id')
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  //   }

  @Patch('/:id/status')
  updataBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardsService.updateBoardStatus(id, status)
  }

  //   @Patch('/:id/status')
  //   updataBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status',BoardStatusValidationPipe) status: BoardStatus
  //   ) {
  //     return this.boardsService.updateBoardStatus(id, status)
  //   }
}


// 접근 제어자를 활용해서 간단하게 위와 같이 코드 정리
// @Controller('boards')
// export class BoardsController {
//   boardsService: BoardsService

//   constructor(boardsService: BoardsService) {
//     this.boardsService = boardsService
//   }
// }
