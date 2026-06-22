import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().default('8080'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_PRIVATE_KEY_PATH: z.string(),
  JWT_PUBLIC_KEY_PATH: z.string(),
  JWT_ACCESS_TTL: z.string().default('900'),
  JWT_REFRESH_TTL: z.string().default('604800'),
  AWS_REGION: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_SES_FROM_EMAIL: z.string().email(),
  FCM_SERVER_KEY: z.string(),
  CBS_BASE_URL: z.string().url().optional(),
  UPI_ENABLED: z.enum(['true', 'false']).default('false'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
