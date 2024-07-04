import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') dotenv.config({ path: '.env.production' });
else dotenv.config({ path: '.env.local' });

export default function locals() {
  if (Object.entries(process.env).length == 0)
    throw new Error('No environment variables found');

  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined)
      throw new Error(`Please set ${key} in environment variables file`);
  }

  return {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  };
}
