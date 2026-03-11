import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigCompany } from 'src/config-company/entities/config-company.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Repository } from 'typeorm';
import moment from 'moment';
@Injectable()
export class AssemblyRipsService {
  private readonly logger = new Logger('AssemblyRipsService');
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ConfigCompany)
    private readonly configCompanyRepository: Repository<ConfigCompany>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
    @InjectRepository(MedicalService)
    private readonly medicalServiceRepository: Repository<MedicalService>,
  ) {}
  async assemblyRipsAndReturn(): Promise<any> {
    try {
      const configCompany = await this.configCompanyRepository.findOne({
        where: { idConfigCompany: 1 },
      });
      // Verificar como se debe descargar el rips, si por  servicio, por fecha, etc..
      const patients = await this.patientRepository.find({});
      const medicalService = await this.medicalServiceRepository.find({});
      const medicalRecords = await this.medicalRecordRepository.find({});
      const rips = {
        numDocumentoIdObligado: configCompany.nit,
        numFactura: 'Se obtiene cuando esté la facturación',
        tipoNota: 'Se obtiene cuando esté la facturación',
        numNota: 'Se obtiene cuando esté la facturación',
        usuarios: patients.map((patient) => {
          return {
            tipoDocumentoIdentificacion: patient.documentType.codeMin ?? null,
            numDocumentoIdentificacion: patient.document ?? null,
            tipoUsuario:
              medicalService.find(
                (service) => service.idPatient === patient.idPatient,
              ).vinculationType.codeMin ?? null,
            fechaNacimiento: patient.birthdate
              ? moment(patient.birthdate).format('YYYY-MM-DD')
              : null,
            codSexo: patient.gender.codeMin ?? null,
            codPaisResidencia: '170',
            codPaisOrigen:
              'Se tiene que poner el campo en la creación del paciente',
            codMunicipioResidencia:
              medicalRecords.find(
                (record) =>
                  record.idMedicalService ===
                  medicalService.find(
                    (service) => service.idPatient === patient.idPatient,
                  ).idMedicalService,
              ).municipalityResidencePatient.codeMin ?? null,
            codZonaTerritorialResidencia:
              medicalRecords.find(
                (record) =>
                  record.idMedicalService ===
                  medicalService.find(
                    (service) => service.idPatient === patient.idPatient,
                  ).idMedicalService,
              ).populationZoneResidencePatient.codeMin ?? null,
            incapacidad: 'NO',
            consecutivo: patient.idPatient ?? null,
            servicios: {
              otrosServicios: [
                {
                  codPrestador: 'Se tiene que definir',
                  numAutorizacion: null,
                  idMIPRES: 'Se tiene que definir',
                  fechaSuministroTecnologia:
                    medicalService.find(
                      (service) => service.idPatient === patient.idPatient,
                    ).dateProgrammed ??
                    'Verificar si es cierto o es otra fecha',
                  tipoOS: '02', // TODO: Siempre sería 02-traslados ,
                  codTecnologiaSalud: 'No se sabe cuál es',
                  nomTecnologiaSalud:
                    'Verificar cual sería, no hay lista maestra del min para esto',
                  cantidadOS: '1', // TODO: verificar que siempre es 1 o sino, cómo se identificaría
                  tipoDocumentoIdentificacion:
                    medicalService.find(
                      (service) => patient.idPatient === service.idPatient,
                    ).assignment.medical.documentType.codeMin ??
                    medicalService.find(
                      (service) => patient.idPatient === service.idPatient,
                    ).assignment.medicalAssistant.documentType.codeMin,
                  numDocumentoIdentificacion:
                    medicalService.find(
                      (service) => patient.idPatient === service.idPatient,
                    ).assignment.medical.identification ??
                    medicalService.find(
                      (service) => patient.idPatient === service.idPatient,
                    ).assignment.medicalAssistant.identification,
                  vrUnitOS: '',
                  vrServicio: '',
                  conceptoRecaudo: '05', // TODO Verificar si siempre sería 05 que es no aplica
                  valorPagoModerador: 0, // TODO Verificar si siempre sería 0
                  numFEVPagoModerador: '', // TODO: Este sería la factura de cada servicio, o sea que se tendría que guardar al momento de consultar los rips o en algún momento
                  consecutivo: 1, // TODO: idServico
                },
              ],
            },
          };
        }),
      };
      return {
        rips,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error('Error in assemblyRipsAndReturn', error);
      throw new HttpException(
        'Hubo un error en la solicitud. Por favor, intente de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
