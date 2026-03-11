import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateMedicalServiceSignatureDto } from './dto/create-medical-service-signature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MedicalServiceSignature } from './entities/medical-service-signature.entity';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MedicalServiceSignaturesService {
  private readonly logger = new Logger('MedicalServiceSignaturesService');
  constructor(
    @InjectRepository(MedicalServiceSignature)
    private readonly medicalServiceSignatureRepository: Repository<MedicalServiceSignature>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  async create(
    createMedicalServiceSignatureDto: CreateMedicalServiceSignatureDto,
    approvingUserId: string,
  ) {
    try {
      const signingUser = await this.userRepository.findOne({
        where: { idUser: createMedicalServiceSignatureDto.signingUserId },
        select: { idUser: true, identification: true, password: true },
      });
      if (!signingUser) {
        throw new BadRequestException('No se encontro el usuario');
      }
      const { password, ...rest } = createMedicalServiceSignatureDto;
      await this.authService.validatePassword(password, signingUser.password);

      const medicalServiceSignature =
        this.medicalServiceSignatureRepository.create({
          ...rest,
          approvingUserId,
        });

      await this.medicalServiceSignatureRepository.save(
        medicalServiceSignature,
      );

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
