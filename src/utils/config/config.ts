import dotenv from "dotenv";
import path from "path";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Env types
interface ENV {
  PORT: number | undefined;
  JWT_SECRET_ADMIN: string | undefined;
  JWT_SECRET_USER: string | undefined;
  EMAIL_SEND_EMAIL_ID: string | undefined;
  EMAIL_SEND_PASSWORD: string | undefined;
}

// Config types
interface Config {
  PORT: number;
  JWT_SECRET_ADMIN: string;
  JWT_SECRET_USER: string;
  EMAIL_SEND_EMAIL_ID: string;
  EMAIL_SEND_PASSWORD: string;
}

// Loading process.env as  ENV interface
const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 9005,
    JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN,
    JWT_SECRET_USER: process.env.JWT_SECRET_MEMBER,
    EMAIL_SEND_EMAIL_ID: process.env.EMAIL_SEND_EMAIL_ID,
    EMAIL_SEND_PASSWORD: process.env.EMAIL_SEND_PASSWORD,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

export default getSanitzedConfig(getConfig());
