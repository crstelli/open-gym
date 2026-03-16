function loadDotEnv() {
  process.loadEnvFile("./.env");
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}

loadDotEnv();

export const NODE_ENV = getEnv("NODE_ENV");

export const SERVER_PORT = getEnv("SERVER_PORT");
export const DATABASE_URL = getEnv("DATABASE_URL");

export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN");
