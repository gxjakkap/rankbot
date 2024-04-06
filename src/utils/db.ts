import { createClient as createLibSQLClient } from "@libsql/client"
import { createClient as createRedisClient } from "redis"
import { tursoUrl, tursoSecret, redisUrl } from "../config"

export const turso = createLibSQLClient({
    url: tursoUrl,
    authToken: tursoSecret
})