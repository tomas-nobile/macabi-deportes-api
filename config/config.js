import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const serverPort = process.env.PORT;
export const database = process.env.DB_NAME;
export const username =  process.env.DB_USERNAME;
export const password =  process.env.DB_PASSWORD;
export const host =  process.env.DB_HOST;
export const dialect = process.env.DB_DIALECT;
export const port = process.env.DB_PORT
export const secret = process.env.JWT_SECRET;
export const corsOrigin = process.env.CORS_ORIGIN

 


