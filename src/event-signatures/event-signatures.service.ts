import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateEventSignatureDto } from './dto/create-event-signature.dto';
import { EventSignature } from './entities/event-signature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventSignaturesService {
  private readonly logger = new Logger('EventSignaturesService');
  constructor(
    @InjectRepository(EventSignature)
    private readonly eventSignatureRepository: Repository<EventSignature>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  async create(
    createEventSignatureDto: CreateEventSignatureDto,
    approvingUserId: string,
  ) {
    try {
      const signingUser = await this.userRepository.findOne({
        where: { idUser: createEventSignatureDto.signingUserId },
        select: { idUser: true, identification: true, password: true },
      });
      if (!signingUser) {
        throw new BadRequestException('No se encontro el usuario');
      }
      const { password, ...rest } = createEventSignatureDto;
      await this.authService.validatePassword(password, signingUser.password);

      const medicalServiceSignature = this.eventSignatureRepository.create({
        ...rest,
        approvingUserId,
      });

      await this.eventSignatureRepository.save(medicalServiceSignature);

      return medicalServiceSignature;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
