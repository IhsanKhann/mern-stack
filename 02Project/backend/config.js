// this will have the env easy to manage using the config file.
import dotenv from "dotenv" ;
dotenv.config();

const config = {
    mongoURL: process.env.MONGO_URI,
    PORT: process.env.PORT
}

export default config;