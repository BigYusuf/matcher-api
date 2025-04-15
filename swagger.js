const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const generateSchemas = require("./utils/generateSequelizeSchemas");
// const publicPaths = require("./swaggerPaths/publicPaths");
// const protectedPaths = require("./swaggerPaths/protectedPaths");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alpha Matching Dynamic API",
      version: "1.0.0",
      description: "Auto-generated API docs with Swagger + JSDoc",
    },
    components: {
      schemas: generateSchemas(), // ← Drop generated schemas here
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // paths: { ...publicPaths, ...protectedPaths },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./docs/*.js"], // <== Add the docs folder here
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
