import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./auth.repository";
import { User } from "./user.entity";
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // extends PassportStrategy(Strategy)를 통해 AuthGuard()에 사용된다.
  // PassportStrategy(Strategy, jwt) -> jwt가 기본값 변경을 하고 싶으면 (Strategy, myJwt) 이렇게 변경
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      // 내가 기존에 사용하던 방식과 다르다 쿠키에서 받는 것은 따로 만들어야함, 이건 헤더에서 가져온다. 
      // 즉, 클라이언트에서 헤더로 토큰을 보내는 코드가 필요하다. 
    })
  }
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user
  }
}