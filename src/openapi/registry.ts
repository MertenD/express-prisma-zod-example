import {OpenApiGeneratorV3, OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import { env } from "../config/env"

export const registry = new OpenAPIRegistry()

export function generateOpenAPIDocument() {
    const generator = new OpenApiGeneratorV3(registry.definitions)

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Express Prisma Zod API",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`
            }
        ]
    })
}