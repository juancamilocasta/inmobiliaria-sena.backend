import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractingClientDto } from './dto/create-contracting-client.dto';
import { ContractingClient } from './entities/contracting-client.entity';
import { UpdateContractingClientDto } from './dto/update-contracting-client.dto';

@Injectable()
export class ContractingClientService {
  private readonly logger = new Logger('ContractingClientService');
  constructor(
    @InjectRepository(ContractingClient)
    private readonly contractingClientRepository: Repository<ContractingClient>,
  ) {}
  async createContractingClient(
    createContractingClientDto: CreateContractingClientDto,
  ) {
    try {
      const createContractingClient = this.contractingClientRepository.create(
        createContractingClientDto,
      );
      const saveContractingClient = await this.contractingClientRepository.save(
        createContractingClient,
      );

      if (!saveContractingClient) {
        throw new HttpException(
          'No se ha podido crear el cliente, intente nuevamente',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Se ha creado el cliente correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);

      if (error.code === 'ER_DUP_ENTRY') {
        const errorMessage = error.sqlMessage.toLowerCase();

        if (errorMessage.includes("for key 'unique_email'")) {
          throw new HttpException(
            'Ya existe un registro con el mismo correo',
            HttpStatus.CONFLICT,
          );
        } else if (errorMessage.includes("for key 'unique_document'")) {
          throw new HttpException(
            'Ya existe un registro con el mismo documento',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllContractingClient() {
    try {
      const contractingClientsResponse =
        await this.contractingClientRepository.find({
          relations: {
            clientType: true,
            documentType: true,
            taxDetail: true,
            taxResponsibility: true,
            personType: true,
            municipality: {
              department: true,
            },
            contractingClientsServices: {
              serviceType: true,
            },
          },
        });
      if (!contractingClientsResponse) {
        throw new HttpException(
          'No se encontraron clientes',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        contractingClient: contractingClientsResponse,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateContractingClient(
    idContractingClient: number,
    updateContractingClientDto: UpdateContractingClientDto,
  ) {
    try {
      const contractingClient =
        await this.contractingClientRepository.findOneBy({
          idContractingClient: idContractingClient,
        });

      if (!contractingClient) {
        throw new HttpException('El cliente no existe', HttpStatus.NOT_FOUND);
      }

      const dataForSave = {
        ...contractingClient,
        ...updateContractingClientDto,
      };
      const updateContractingClient =
        await this.contractingClientRepository.save(dataForSave);

      if (!updateContractingClient) {
        throw new HttpException(
          'No se pudo actualizar el cliente',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        message: 'Se ha actualizado el cliente correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);

      if (error.code === 'ER_DUP_ENTRY') {
        const errorMessage = error.sqlMessage.toLowerCase();

        if (errorMessage.includes("for key 'unique_email'")) {
          throw new HttpException(
            'Ya existe un registro con el mismo correo',
            HttpStatus.CONFLICT,
          );
        } else if (errorMessage.includes("for key 'unique_document'")) {
          throw new HttpException(
            'Ya existe un registro con el mismo documento',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
