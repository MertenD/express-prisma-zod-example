import {RequestHandler} from "express";
import {ZodError, ZodSchema} from "zod";

export const validateBody =
    <T>(schema: ZodSchema<T>): RequestHandler =>
        (req, res, next) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        message: "Validation error",
                        errors: error.message,
                    });
                }
                next(error);
            }
        };
