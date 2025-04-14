const fs = require("fs");
const path = require("path");

const ROUTES_DIR = path.join(__dirname, "../routes");
const PUBLIC_PATH = path.join(__dirname, "../swaggerPaths/publicPaths.js");
const PROTECTED_PATH = path.join(
  __dirname,
  "../swaggerPaths/protectedPaths.js"
);

const publicKeywords = ["/login", "/register"];

function extractEndpoints(fileContent) {
  const lines = fileContent.split("\n");
  const endpoints = [];

  lines.forEach((line) => {
    const match = line.match(
      /route\.(get|post|put|delete)\(["'`]([^"'`]+)["'`]/i
    );
    if (match) {
      const method = match[1];
      const path = match[2];
      const isProtected = /isAuth|isAdmin/.test(line);
      endpoints.push({ method, path, isProtected });
    }
  });

  return endpoints;
}

function generateSwaggerPath(path, method, isProtected) {
  return `  "${path}": {
    "${method}": {
      summary: "${method.toUpperCase()} ${path}",
      description: "Auto-generated endpoint for ${path}",
      operationId: "${method}_${path.replace(/[\/{}]/g, "_")}",
      ${isProtected ? "security: [{ bearerAuth: [] }]," : ""}
      responses: {
        "200": {
          description: "Success"
        }
      }
    }
  }`;
}

function groupEndpointsByProtection(endpoints) {
  const publicPaths = {};
  const protectedPaths = {};

  endpoints.forEach(({ path, method, isProtected }) => {
    const swaggerEntry = generateSwaggerPath(path, method, isProtected);
    if (isProtected || !publicKeywords.includes(path)) {
      protectedPaths[path] = swaggerEntry;
    } else {
      publicPaths[path] = swaggerEntry;
    }
  });

  return { publicPaths, protectedPaths };
}

function writeSwaggerFile(targetPath, swaggerEntries, label) {
  const content = `/**
 * Auto-generated Swagger ${label} paths
 */
module.exports = {
${Object.values(swaggerEntries).join(",\n")}
};
`;
  fs.writeFileSync(targetPath, content);
  console.log(`✅ ${label} Swagger paths written to ${targetPath}`);
}

function generateSwaggerDocsFromRoutes() {
  const allEndpoints = [];

  fs.readdirSync(ROUTES_DIR).forEach((file) => {
    const filePath = path.join(ROUTES_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const endpoints = extractEndpoints(content);
    allEndpoints.push(...endpoints);
  });

  const { publicPaths, protectedPaths } =
    groupEndpointsByProtection(allEndpoints);

  writeSwaggerFile(PUBLIC_PATH, publicPaths, "Public");
  writeSwaggerFile(PROTECTED_PATH, protectedPaths, "Protected");
}

module.exports = { generateSwaggerDocsFromRoutes };
