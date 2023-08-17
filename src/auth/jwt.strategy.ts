import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

export interface JwtPayload {
  id: number;
  name: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'fmcg_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByUsername(payload.name);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
