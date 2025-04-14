const fs = require("fs");
const path = require("path");

const routesDir = path.join(__dirname, "..", "routes");
const docsDir = path.join(__dirname, "..", "docs");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Utility to convert `userRoutes.js` → `Users`
const toTagName = (filename) => {
  const base = filename.replace(/Routes?\.js$/, "").replace(/\.js$/, "");
  return base.charAt(0).toUpperCase() + base.slice(1);
};

const extractRoutesFromFile = (fileContent) => {
  const routeRegex = /(\w+)\.([getpostputdeletepatch]+)\(["'`](.*?)["'`],\s*(.*?)\)/g;
  const routes = [];

  let match;
  while ((match = routeRegex.exec(fileContent)) !== null) {
    routes.push({
      method: match[2],
      path: match[3],
      handler: match[4],
    });
  }

  return routes;
};

const extractPathParams = (path) => {
  const paramRegex = /:([a-zA-Z_]+)/g;
  const params = [];
  let match;
  while ((match = paramRegex.exec(path)) !== null) {
    params.push({
      name: match[1],
      in: "path",
      required: true,
      schema: { type: "string" },
    });
  }
  return params;
};

const generateSwaggerComment = ({ method, path }, tagName) => {
  const fullPath = `/api${path}`;
  const params = extractPathParams(path);

  const paramBlock = params
    .map(
      (p) => `
 *       - name: ${p.name}
 *         in: ${p.in}
 *         required: ${p.required}
 *         schema:
 *           type: ${p.schema.type}`
    )
    .join("\n");

  return `
/**
 * @swagger
 * ${fullPath}:
 *   ${method}:
 *     summary: TODO - Add summary
 *     tags: [${tagName}]
 *${params.length ? `     parameters:\n${paramBlock}` : ""}
 *${["post", "put", "patch"].includes(method) ? `     requestBody:\n       required: true\n       content:\n         application/json:\n           schema:\n             type: object\n             properties: {}\n` : ""}
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
`;
};

const generateDocsFromRoutes = (fileName) => {
  const filePath = path.join(routesDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const routes = extractRoutesFromFile(fileContent);
  const tagName = toTagName(fileName);

  const comments = routes.map((r) => generateSwaggerComment(r, tagName)).join("\n");

  const docFileName = fileName.replace(".js", "Docs.js");
  const docPath = path.join(docsDir, docFileName);

  const output = `/**
 * Auto-generated Swagger docs for ${fileName}
 */

${comments}
`;

  fs.writeFileSync(docPath, output, "utf8");
  console.log(`✅ Swagger doc generated: ${docFileName}`);
};

// Run for all route files
fs.readdirSync(routesDir)
  .filter((file) => file.endsWith(".js"))
  .forEach(generateDocsFromRoutes);
