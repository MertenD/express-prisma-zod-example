import express from "express";
import swaggerUi from "swagger-ui-express"
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import postsRouter from "./modules/posts/posts.controller";
import {generateOpenAPIDocument} from "./openapi/registry";
import {loadOpenApiDefinitions} from "./openapi/loadOpenApi";

const app = express();
app.use(express.json());

// -> Add routes here
app.use("/api/posts", postsRouter);

// Swagger OpenAPI
if (process.env.NODE_ENV !== "test") {
    // Load openapi definitions (*.openapi.ts files)
    loadOpenApiDefinitions()
    const openApiDocument = generateOpenAPIDocument()
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openApiDocument))
    app.use("/openapi.json", (req, res) => {
        res.json(openApiDocument)
    })
}

// 404 & Error-Handler
app.use(notFound);
app.use(errorHandler);

export default app;
