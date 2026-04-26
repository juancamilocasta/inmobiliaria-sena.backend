import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiBasicResponse } from 'src/interfaces/response-general-requests.model';
import { ConfigCompanyService } from 'src/config-company/config-company.service';
import { GetAllUserResponse } from './interfaces/users-responses.model';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    private readonly configCompanyService: ConfigCompanyService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<ApiBasicResponse> {
    try {
      const { password, ...newUserData } = createUserDto;
      const newUser = this.userRepository.create(newUserData);
      const salt = await bcrypt.genSalt();
      const hashPassaword = await bcrypt.hash(password, salt);
      newUser.password = hashPassaword;
      await this.userRepository.save(newUser);
      if (!newUser) {
        throw new HttpException(
          'Error al crear el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'Usuario creado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Ya existe un usuario con ese número de identificación',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllusers(): Promise<GetAllUserResponse> {
    try {
      const findUsers = await this.userRepository.find({

      });

      if (findUsers.length === 0) {
        throw new HttpException('No existen usuarios', HttpStatus.NOT_FOUND);
      }

      return {
        users: findUsers,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    idUser: string,
  ): Promise<ApiBasicResponse> {
    try {

      const findUserUpdate = await this.userRepository.findOneBy({
        idUser,
      });

      const { password, ...userData } = updateUserDto;
      const newDataUser = {
        ...findUserUpdate,
        ...userData,
      };
      if (password) {
        const salt = await bcrypt.genSalt();
        const hashPassaword = await bcrypt.hash(password, salt);
        newDataUser.password = hashPassaword;
      }
      const updateUser = await this.userRepository.save(newDataUser);

      if (!updateUser) {
        throw new HttpException(
          'Error al actualizar el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'Usuario actualizado correctamente',
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updatePassword(
    {
      currentPassword,
      newPassword
    }: UpdatePasswordDto,
    idUser: string,
  ): Promise<ApiBasicResponse> {
    try {

      const findUserUpdate = await this.userRepository.findOne({
        where: { idUser },
        select: {
          password: true,
          idUser: true,
          userNames: true,
          lastName: true,
          identification: true,
          active: true,
          dateCreated: true
        }
      });

      const isValid = await bcrypt.compare(currentPassword, findUserUpdate.password);

      if (!isValid) {
        throw new HttpException(
          'La contraseña actual es incorrecta',
          HttpStatus.BAD_REQUEST,
        );
      }
      const salt = await bcrypt.genSalt();
      const hashPassaword = await bcrypt.hash(newPassword, salt);
      findUserUpdate.password = hashPassaword;

      const updateUser = await this.userRepository.save(findUserUpdate);

      if (!updateUser) {
        throw new HttpException(
          'Error al actualizar el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        message: 'Contraseña actualizada correctamente',
        statusCode: 200,
      };
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
