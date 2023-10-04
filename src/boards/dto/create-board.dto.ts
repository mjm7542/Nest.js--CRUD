import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty() // 유효성 검사를 위한 데코레이터
    title: string;
    @IsNotEmpty()
    description: string;
}

// createBoardDto 이건 변수를 객체에 담아서 세트로 묶은 어떤 것? 하나씩 하면은 다 바꿔주기 힘드니까 이렇게 묶어서 관리하는 듯