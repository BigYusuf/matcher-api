module.exports = {
  "/users/{id}": {
    get: {
      summary: "Get user profile",
      description: "Retrieve the profile of a specific user by their ID.",
      operationId: "getUserProfile",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      security: [{ bearerAuth: [] }], // Requires JWT token for access
      responses: {
        200: {
          description: "User profile fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User", // Reference to the User schema
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid or missing JWT token",
        },
      },
    },
  },
  "/admin/users": {
    get: {
      summary: "Get all users (Admin only)",
      description: "Retrieve all users. This route is for admin users only.",
      operationId: "getAllUsers",
      security: [{ bearerAuth: [] }], // Requires JWT token for admin access
      responses: {
        200: {
          description: "List of all users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User", // Reference to the User schema
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid or missing JWT token",
        },
        403: {
          description: "Forbidden - Admin access required",
        },
      },
    },
  },

  "/analytics/match": {
    get: {
      tags: ["Analytics"],
      summary: "Get all match analytics",
      description:
        "Retrieve all analytics data related to user matches (Admin only)",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Analytics data retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Analytics" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Error fetching analytics data" },
      },
    },
  },

  "/analytics/match/{id}": {
    get: {
      tags: ["Analytics"],
      summary: "Get match analytics by ID",
      description: "Retrieve a single match analytic record by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Match analytics retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  data: { $ref: "#/components/schemas/Analytics" },
                },
              },
            },
          },
        },
        404: { description: "No Data found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/analytics/match/{userId}": {
    get: {
      tags: ["Analytics"],
      summary: "Get match analytics by User ID",
      description:
        "Retrieve all match analytics data for a specific user (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Match Analytics retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Analytics" },
                  },
                },
              },
            },
          },
        },
        404: { description: "No Data found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/analytics": {
    get: {
      tags: ["Analytics"],
      summary: "Get all registration analytics",
      description: "Retrieve all user registration analytics data (Admin only)",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Register analytics retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/RegistrationAnalytics",
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
  },

  "/analytics/{id}": {
    get: {
      tags: ["Analytics"],
      summary: "Get registration analytics by ID",
      description:
        "Retrieve a specific registration analytic record by ID (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Registration analytics retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  data: { $ref: "#/components/schemas/RegistrationAnalytics" },
                },
              },
            },
          },
        },
        404: { description: "No Data found" },
        500: { description: "Internal server error" },
      },
    },
  },
  
    "/matches": {
      post: {
        tags: ["Matches"],
        summary: "Match users",
        description: "Run AI-based matchmaking for a user (Auth required)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  text: { type: "string", example: "I love hiking" },
                  type: { type: "string", example: "romantic" },
                  prompt: { type: "string", example: "match criteria prompt" },
                },
                required: ["text", "type"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Matchmaking completed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/MatchResult" },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal Server Error" },
        },
      },
    },
  
    "/matches/{userId}": {
      get: {
        tags: ["Matches"],
        summary: "Get user match results",
        description: "Retrieve match results for a specific user (Auth required)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Match results retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/MatchResult" },
                    },
                  },
                },
              },
            },
          },
          404: { description: "No match found" },
          500: { description: "Internal server error" },
        },
      },
    },
  
    "/matches/admin": {
      get: {
        tags: ["Matches"],
        summary: "Get all match results (Admin)",
        description: "Retrieve all match results (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "All matches retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/MatchResult" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
  
    "/matches/admin/{id}": {
      get: {
        tags: ["Matches"],
        summary: "Get specific match result (Admin)",
        description: "Retrieve a specific match result by ID (Admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Match result retrieved",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/MatchResult" },
                  },
                },
              },
            },
          },
          404: { description: "Match result not found" },
          500: { description: "Internal server error" },
        },
      },
    },
  
};
