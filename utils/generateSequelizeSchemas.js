const db = require("../models"); // Your Sequelize models directory

const mapSequelizeTypeToSwagger = (sequelizeType) => {
  const typeStr = sequelizeType.constructor.key.toLowerCase();

  switch (typeStr) {
    case "string":
    case "text":
      return { type: "string" };
    case "integer":
    case "bigint":
    case "float":
    case "double":
    case "real":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "date":
    case "dateonly":
      return { type: "string", format: "date-time" };
    case "json":
      return { type: "object" };
    default:
      return { type: "string" }; // fallback
  }
};

const generateSchemas = () => {
  const schemas = {};

  for (const [modelName, model] of Object.entries(db)) {
    if (!model.rawAttributes) continue;

    const properties = {};
    const required = [];

    for (const [attr, attrDef] of Object.entries(model.rawAttributes)) {
      if (attr === "id" || attr === "createdAt" || attr === "updatedAt") continue;

      properties[attr] = mapSequelizeTypeToSwagger(attrDef.type);

      if (!attrDef.allowNull && !attrDef.autoIncrement && !attrDef.defaultValue) {
        required.push(attr);
      }
    }

    schemas[modelName] = {
      type: "object",
      properties,
      ...(required.length > 0 ? { required } : {}),
    };
  }

  return schemas;
};

module.exports = generateSchemas;
