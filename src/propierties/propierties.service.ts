import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePropiertyDto } from './dto/create-propierty.dto';
import { UpdatePropiertyDto } from './dto/update-propierty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Propierty } from './entities/propierty.entity';
import { Between, Repository } from 'typeorm';
import { PropiertyImagesService } from 'src/propierty-images/propierty-images.service';
import { GetAllPropiertiesActivesFilterDto } from './dto/get-all-propierties-actives-filter.dto';
import { GetAllPropiertyAdminDto } from './dto/get-all-propierty-admin.dto';
import { pageToOffset } from 'src/utilities/pageToOffset';

@Injectable()
export class PropiertiesService {
  private readonly logger = new Logger('PropiertiesService');

  constructor(
    private readonly propiertyImagesService: PropiertyImagesService,
    @InjectRepository(Propierty)
    private readonly propiertyRepository: Repository<Propierty>
  ) { }
  async generateUniquePropertyCode(): Promise<string> {
    const characters = '0123456789';
    let isUnique = false;
    let newCode = '';

    while (!isUnique) {
      newCode = '';
      for (let i = 0; i < 5; i++) {
        newCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      const exists = await this.propiertyRepository.findOne({
        where: {
          propiertyCode: newCode,
          active: 1
        }
      });

      if (!exists) {
        isUnique = true;
      }
    }

    return newCode;
  }

  async createPropierty(createPropiertyDto: CreatePropiertyDto) {
    try {
      const propiertyCode = await this.generateUniquePropertyCode();
      const createdPropierty = this.propiertyRepository.create({
        ...createPropiertyDto,
        propiertyCode
      });
      if (!createdPropierty) {
        throw new HttpException(
          'Error al crear la propiedad. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const savePropierty = await this.propiertyRepository.save(createdPropierty);
      await this.propiertyImagesService.createImages({
        idPropierty: savePropierty.idPropierty,
        urlImages: createPropiertyDto.urlImages
      });
      return {
        message: 'Propiedad creada con éxito',
        statusCode: HttpStatus.CREATED
      }
    } catch (error) {
      this.logger.error(`Error creating propierty: ${error}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPropierties({ dateStart, dateEnd }: GetAllPropiertyAdminDto) {
    try {
      const propierties = await this.propiertyRepository.find({
        where: {
          dateCreated: Between(dateStart, dateEnd)
        },
        order: { dateCreated: 'DESC' },
        relations: {
          ubication: true,
          propiertyType: true,
          propiertyState: true,
          propiertyImages: true
        }
      });
      if (propierties.length === 0) {
        throw new HttpException(
          'No se encontraron propiedades. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.NOT_FOUND
        )
      }
      return {
        propierties,
        statusCode: HttpStatus.OK
      };;
    } catch (error) {
      this.logger.error(`Error searching propierties: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPropiertiesActives(params: GetAllPropiertiesActivesFilterDto) {
    try {
      if (params?.priceStart && !params.priceEnd || !params.priceStart && params?.priceEnd) {
        throw new HttpException(
          'El precio inicial y final deben ser proporcionados juntos',
          HttpStatus.BAD_REQUEST
        );
      }
      const filters = [
        { idUbication: params?.idUbication, price: params?.priceStart && Between(params?.priceStart, params?.priceEnd), propiertyCode: params?.propiertyCode, idPropiertyType: params?.idPropiertyType, typeOperation: params?.typeOperation, active: 1 },
      ]
      const offset = pageToOffset(params.page, params.limit);
      const getPropierties = await this.propiertyRepository.findAndCount({
        where:
          filters.filter(Boolean).length === 0 ? [
            { active: 1 }
          ] : filters.filter(Boolean),
        order: { dateCreated: 'DESC' },
        relations: {
          ubication: true,
          propiertyType: true,
          propiertyState: true,
          propiertyImages: true
        },
        skip: offset,
        take: params.limit

      });
      const [propierties, total] = getPropierties;
      if (propierties.length === 0) {
        throw new HttpException(
          'No se encontraron propiedades. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.NOT_FOUND
        )
      }
      return {
        propierties,
        total,
        statusCode: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error searching propierties actives: ${error}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePropierty(id: number, updatePropiertyDto: UpdatePropiertyDto) {
    try {
      const propierty = await this.propiertyRepository.findOne({
        where: { idPropierty: id },
        relations: {
          propiertyImages: true
        }
      });
      if (!propierty) {
        throw new HttpException(
          'Propiedad no encontrada. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.NOT_FOUND
        );
      }

      const savePropierty = await this.propiertyRepository.save({
        ...propierty,
        ...updatePropiertyDto
      });
      if (updatePropiertyDto.active === 0) {
        for (const image of propierty.propiertyImages) {
          await this.propiertyImagesService.deleteImage(image.idPropiertyImage);
        }
      } else {
        await this.propiertyImagesService.createImages({
          idPropierty: savePropierty.idPropierty,
          urlImages: updatePropiertyDto.urlImages
        });
      }
      return {
        message: 'Propiedad actualizada con éxito',
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      this.logger.error(`Error updating propierty: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
