import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
    override: true
});

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z
        .string()
        .default("3000")
        .transform((val) => Number(val)),
    DATABASE_URL: z
        .string()
        .refine(
            (val) => val.startsWith("postgres://") || val.startsWith("postgresql://"),
            "DATABASE_URL must be a valid DB connection string"
        ),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Invalid environment variables:", _env.error.message);
    process.exit(1);
}

export const env = _env.data;
