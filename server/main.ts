import { Application, logger } from "./deps.ts";
import router from "./router/routes.ts";
import { JWT_ALG, JWT_KEY, PORT } from "./utils/constants.ts";
import { type IgnorePattern, jwtMiddleware } from "./deps.ts";

const app = new Application();

const ignorePatterns: IgnorePattern[] = [
  /\/api\/app\/((user\/weappLogin)$)/,
  /\/api\/app\/((user\/login)$)/,
  /\/api\/app\/((user\/logout)$)/,
  /\/api\/app\/((user\/register)$)/,
];

app.use(logger.logger);
app.use(logger.responseTime);

app.use(
  jwtMiddleware<any>({
    key: JWT_KEY,
    algorithm: JWT_ALG,
    ignorePatterns: ignorePatterns,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`server start success: ${PORT}`);

await app.listen({ port: PORT });
