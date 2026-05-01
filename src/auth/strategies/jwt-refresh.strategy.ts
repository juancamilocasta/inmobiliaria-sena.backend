import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('jwtRefresh.secret'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
    });
  }
  async validate(payload: JwtPayload) {
    try {
      const { idUser } = payload;
      const user = await this.userRepository.findOneBy({ idUser });
      if (!user) {
        throw new HttpException('Token no valido', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
