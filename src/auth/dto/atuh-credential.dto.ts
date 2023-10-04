import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어와 숫자만 가능함
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password olny accepts english and number'
  })
  password: string;
}