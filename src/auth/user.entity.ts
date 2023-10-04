import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique, } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Board, board => board.user, { eager: true })
  board: Board[]
}

// board => board.user 연결된 테이블에서 user에 접근할 때
// board는 Board 엔터티에서의 별칭이며, 개발자가 설정하지 않아도 TypeORM에서 자동으로 생성한다. 대분자를 소문자로 변경해서 생성
// board: Board[] 연결하기 위해 필요함
// eager: true 연결된 테이블에 정보도 같이 불러올 것인지