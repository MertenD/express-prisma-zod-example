import "./openapi/zod-extend"

import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`
    console.log(`Server is running on ${url}`);
    console.log(`Swagger docs are available on ${url}/swagger`)
});
