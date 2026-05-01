import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async refreshToken(user: User) {
    try {
      const { idUser } = user;
      if (!idUser) {
        throw new HttpException('Usuario no valido', HttpStatus.UNAUTHORIZED);
      }
      const payload: JwtPayload = {
        idUser,
      };
      return {
        tokens: this.generateTokens(payload),
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.response || 'Hubo un error al procesar la solicitud',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async validateToken({ token }: { token: string }): Promise<any> {
    try {
      const decoded: JwtPayload = await this.verifyToken(token);
      if (!decoded) {
        throw new HttpException('Token Invalido', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userRepository.findOneBy({
        idUser: decoded.idUser,
      });

      if (!user) {
        throw new HttpException(
          'El usuario no se encuentra o no tiene permisos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        user: { ...user, isActive: Boolean(user.active) },
        message: null,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.response || 'Hubo un error al procesar la solicitud',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async loginAuth(loginAuthDto: LoginAuthDto) {
    try {
      const { user, password } = loginAuthDto;

      const userDB = await this.userRepository.findOne({
        where: { identification: user },
        select: { password: true }
      });

      if (!userDB) {
        throw new HttpException(
          'Usuario y/o contraseña invalidos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isValid = await bcrypt.compare(password, userDB.password);

      if (!isValid) {
        throw new HttpException(
          'Usuario y/o contraseña invalidos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const resUser = await this.userRepository.findOne({
        where: {
          idUser: userDB.idUser,
        },
      });

      const payload = { idUser: userDB.idUser };

      return {
        user: resUser,
        tokens: this.generateTokens(payload),
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message || 'Hubo un error al intentar iniciar sesión',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateJwt(payload: JwtPayload, options: JwtSignOptions = null) {
    return this.jwtService.sign(payload, options);
  }

  private generateTokens(payload: JwtPayload) {
    const accessToken = this.generateJwt(payload);
    const refreshToken = this.generateJwt(payload, {
      expiresIn: this.configService.get<string>('jwtRefresh.expiresIn'),
      secret: this.configService.get<string>('jwtRefresh.secret'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async validatePassword(password, hashPassword) {
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      throw new BadRequestException('Contraseña incorrecta');
    }
  }
}
