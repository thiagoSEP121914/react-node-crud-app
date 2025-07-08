import mysql, {Pool} from "mysql";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();

const dbConnection: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

export default dbConnection;