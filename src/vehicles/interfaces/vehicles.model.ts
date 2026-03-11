export interface VehicleProps {
  idVehicle: number;
  descriptionVehicle: string;
  activeVehicle: number;
}
export interface GetVehicleResponse {
  vehicles: VehicleProps[];
  statusCode: number;
}
