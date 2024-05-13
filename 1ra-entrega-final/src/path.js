import { fileURLToPath } from "url"
import { dirname } from "path"

const __fileName = fileURLToPath(import.meta.url)

export const __dirname = dirname(__fileName)