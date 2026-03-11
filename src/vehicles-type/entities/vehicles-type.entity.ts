import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('vehiclesTypes')
export class VehiclesType {
  @PrimaryGeneratedColumn('increment', { name: 'idVehicleType' })
  idVehicleType: number;

  @Column('varchar', { name: 'vehicleTypeDescription', length: 50 })
  vehicleTypeDescription: string;

  @Column('tinyint', { name: 'active', default: 1, select: false })
  active: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehiclesType)
  vehicles: Vehicle[];
}
