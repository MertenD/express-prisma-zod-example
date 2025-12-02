import {extendZodWithOpenApi} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";

// This function has a side effect, nothing needs to be exported
extendZodWithOpenApi(z)