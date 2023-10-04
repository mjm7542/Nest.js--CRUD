import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) { }
  // getAllBoards(): Board[] {
  //   return this.boards
  // }

  async getAllBoards(
    user: User): Promise<Board[]> {
    // 당연히 typeORM에서 제공하는 find 등을 이용할 수 있다. 하지만 보다 복잡한 쿼리의 경우 이렇게 로우 쿼리를 이용할 수 있다.
    const query = this.boardRepository.createQueryBuilder('board')
    //'board'는 내가 정한 별칭(alias)
    query.where('board.userId = :userId', { userId: user.id });
    // :userId는 파라미터화된 쿼리의 플레이스홀더, 여기에 뒤에 { userId: user.id } 플레이스홀더에 실제로 바인딩될 값을 제공.
    const boards = await query.getMany();
    // 찾은 쿼리 전체를 가져온다.

    return boards;
  }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;

  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC
  //   }

  //   this.boards.push(board);
  //   return board;
  // }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return found;
  }

  // getBoardById(id: string) {
  //   const found = this.boards.find((board) => board.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Can't find board with id ${id}`);
  //   }

  //   return found
  // }

  async deleteBoard(id: number, user: User): Promise<void> {
const result = await this.boardRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`)
    }

    console.log(result);
  }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;


  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board
  // }

}


//? import { v1 as uuid } from 'uuid';
// uuid에 여러 버전 중에서 v1을 사용하겠다. 그리고 명칭을 uuid로 바꾸겠다. (as)