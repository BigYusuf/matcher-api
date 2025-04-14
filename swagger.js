const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alpha Machining Dynamic API",
      version: "1.0.0",
      description: "Auto-generated API docs with Swagger + JSDoc"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js", "./docs/*.js"] // <== Add the docs folder here
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
