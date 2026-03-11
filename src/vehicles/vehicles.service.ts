import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger('VehiclesService');
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = this.vehicleRepository.create(createVehicleDto);
      return this.vehicleRepository.save(vehicle);
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException(
          'Ya existe un vehiculo con esa placa',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        error.message || 'Error al crear el vehiculo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateVehicle(idVehicle: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      const findVehicle = await this.vehicleRepository.findOneBy({
        idVehicle,
      });
      if (!findVehicle) {
        throw new HttpException('El vehiculo no existe', HttpStatus.NOT_FOUND);
      }
      const newDataVehicle = { ...findVehicle, ...updateVehicleDto };
      await this.vehicleRepository.save(newDataVehicle);
      return newDataVehicle;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(findWithInactives: string) {
    try {
      const where = findWithInactives === '0' ? { active: 1 } : {};
      return await this.vehicleRepository.find({
        where,
        relations: { vehiclesType: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el vehiculo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
