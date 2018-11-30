const CONFIG = {
  middlewareUrl: process.env.MIDDLEWARE_URL,
  db: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DATABASE: process.env.DATABASE,
    MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD
  },
  LOG: {
    env: process.env.LOG_ENV || 'info'
  },
  SALT: process.env.SALT || 10,
  SECRET_KEY: process.env.SECRET_KEY || 'thesupersecretkey',
  SESSION_SECRET: process.env.SESSION_SECRET || 'superscretsession',
  SENDGRID: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET
  },
  REPORT_API_KEY: process.env.REPORT_API_KEY,
  REPORT_API_URL: process.env.REPORT_API_URL,
  REPORT_API_PORT: process.env.REPORT_API_PORT
};

module.exports = CONFIG;
