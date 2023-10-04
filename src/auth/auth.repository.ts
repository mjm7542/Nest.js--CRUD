import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "src/db/typeorm-ex. decorator";
import { AuthCredentialsDto } from "./dto/atuh-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrytpt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User>{
  async creatUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrytpt.genSalt();
    const hashedPassword = await bcrytpt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}