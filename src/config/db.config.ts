import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from 'path';
import { registerAs } from "@nestjs/config";

//factory function
export default registerAs("dbconfig.dev", (): PostgresConnectionOptions => ({
  //Put the url in .env
  url: process.env.DATABASE_URL,
  type: "postgres",
  entities: [path.resolve(__dirname, "..") + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  // logging: true
})
);