module.exports = {
  "/register": {
    post: {
      summary: "User registration",
      description: "Allows a user to register for the application.",
      operationId: "registerUser",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // Reference to the User schema
            },
          },
        },
      },
      responses: {
        201: {
          description: "Registration successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      email: { type: "string" },
                      role: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/login": {
    post: {
      summary: "User login",
      description:
        "Allows a user to log into the application and receive a JWT token.",
      operationId: "loginUser",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful, returns a JWT token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  token: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
