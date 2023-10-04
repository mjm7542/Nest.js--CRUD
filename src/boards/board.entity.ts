import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @Column() // 여기를 추가합니다.
    userId: number;

    @ManyToOne(type => User, user => user.board, { eager: false })
    @JoinColumn({ name: 'userId' }) // 이 부분도 추가하여 userId 컬럼과 관계를 매핑합니다.
    user: User;
}

// @JoinColum은 외래키의 이름을 정의한다. 만약에 위에 컬럼에 동일한 이름이 있다면 그 컬럼이 외래키로 사요된다.
// user: User; 에서 user은 @JoinColum으로 이름을 명시하지 않았을 때 userId로 컬럼이 자동으로 생성되게 하는 역할이다. 혹은 User의 인스턴스를 정의한다.