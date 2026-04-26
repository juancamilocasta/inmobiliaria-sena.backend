import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePropiertyImageDto } from './dto/create-propierty-image.dto';
import { UpdatePropiertyImageDto } from './dto/update-propierty-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiertyImage } from './entities/propierty-image.entity';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class PropiertyImagesService {
  private readonly logger = new Logger('PropiertyImagesService');
  constructor(
    @InjectRepository(PropiertyImage)
    private propiertyImageRepository: Repository<PropiertyImage>,
    private configService: ConfigService,
  ) {
    this.initializeCloudinary();
  }

  private initializeCloudinary() {
    cloudinary.config({
      cloud_name: this.configService.get('cloudynary.cloudName'),
      api_key: this.configService.get('cloudynary.apiKey'),
      api_secret: this.configService.get('cloudynary.apiSecret'),
    });
  }

  async createImages({ idPropierty,
    urlImages
  }: CreatePropiertyImageDto) {
    try {
      for (const urlImage of urlImages) {
        const propiertyImage = this.propiertyImageRepository.create({
          idPropierty,
          urlImage,
        });
        if (!propiertyImage) {
          throw new HttpException(
            'Error al crear la imagen de la propiedad. Por favor, inténtelo de nuevo más tarde',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        await this.propiertyImageRepository.save(propiertyImage);
      }
      return {
        message: 'Imágenes cargadas con éxito',
        statusCode: HttpStatus.CREATED
      }
    } catch (error) {
      this.logger.error(`Error creating propierty images: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getImageByPropierty(idPropierty: number) {
    try {
      const images = await this.propiertyImageRepository.find({
        where: { idPropierty, active: 1 },
      });
      return images;
    } catch (error) {
      this.logger.error(`Error fetching propierty images: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async deleteImage(idPropiertyImage: number) {
    try {
      const image = await this.propiertyImageRepository.findOne({
        where: { idPropiertyImage },
      });
      if (!image) {
        throw new HttpException('Imagen no encontrada', HttpStatus.NOT_FOUND);
      }

      const publicId = this.extractPublicIdFromUrl(image.urlImage);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        this.logger.log(`Imagen eliminada de Cloudinary: ${publicId}`);
      }

      await this.propiertyImageRepository.delete(image);
      return { message: 'Imagen eliminada correctamente', statusCode: HttpStatus.OK };
    } catch (error) {
      this.logger.error(`Error deleting propierty image: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractPublicIdFromUrl(url: string): string {
    try {
      const urlParts = url.split('/');
      const uploadIndex = urlParts.indexOf('upload');
      if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
        const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
        return publicIdWithExtension.split('.')[0];
      }
      return null;
    } catch (error) {
      this.logger.warn(`Error extracting public_id from URL: ${error.message}`);
      return null;
    }
  }
}