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
  cloudynary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.API_SECRET_CLOUDINARY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  }
});
