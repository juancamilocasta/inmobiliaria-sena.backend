export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    type: process.env.DB_CONNECTION || 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3307,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    secure: process.env.MAIL_SECURE,
    rejectUnauthorized: process.env.MAIL_REJECT_UNAUTHORIZED,
  },
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
  jwtRefresh: {
    secret: process.env.APP_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
  },
  stateNew: process.env.STATE_NEW_MEDICAL_SERVICE,
  stateCancelPatient: process.env.STATE_CANCEL_PATIENT,
  stateCancelCompany: process.env.STATE_CANCEL_COMPANY,
  stateAssigned: process.env.STATE_ASSIGNED,
  stateReassigned: process.env.STATE_REASSIGNED ?? 5,
  stateNewEvent: process.env.STATE_NEW_EVENT ?? 1,
  stateCancelPatientEvent: process.env.STATE_CANCEL_PATIENT_EVENT ?? 2,
  stateCancelCompanyEvent: process.env.STATE_CANCEL_COMPANY_EVENT ?? 3,
  stateAssignedEvent: process.env.STATE_ASSIGNED_EVENT ?? 4,
  stateReassignedEvent: process.env.STATE_REASSIGNED_EVENT ?? 5,
  stateOnRoutePatientLocation:
    parseInt(process.env.STATE_ON_ROUTE_PATIENT_LOCATION) ?? 6,
  stateArrivedPatientLocation:
    parseInt(process.env.STATE_ARRIVED_PATIENT_LOCATION) ?? 7,
  stateArrivedDestinationOne: parseInt(
    process.env.STATE_ARRIVED_DESTINATION_ONE,
  ),
  stateArrivedDestinationTwo: parseInt(
    process.env.STATE_ARRIVED_DESTINATION_TWO,
  ),
  statesMileageRequired: process.env.MILEAGE_REQUIRED_IDS,
});
