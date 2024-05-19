import * as dotenv from 'dotenv'
dotenv.config();

export const environment = {
  production: false,
  backendURL: "http://localhost:8080/grupo23",
  GEOCODER_API_KEY: process.env['GEOCODER_API_KEY'] || ""
}
