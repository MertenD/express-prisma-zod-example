import path from "path";
import fs from "fs";

export function loadOpenApiDefinitions() {
    const srcDirectory = path.join(__dirname, "..")

    if (!fs.existsSync(srcDirectory)) {
        console.warn("src directory not found for importing openapi definitions")
        return
    }

    const targets = [".openapi.ts", ".openapi.js"]

    const walk = (dir: string) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                walk(fullPath)
            } else {
                if (targets.some((target) => fullPath.endsWith(target))) {
                    require(fullPath)
                }
            }
        }
    }

    walk(srcDirectory)
}