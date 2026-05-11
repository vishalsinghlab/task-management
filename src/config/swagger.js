const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
      {
        url: "https://task-management-1l3m.onrender.com",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
            },
          },
        },

        AuthUser: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "664f12ab45cd7890ef123456",
            },
            username: {
              type: "string",
              example: "john",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "TEAM_MEMBER",
            },
          },
        },

        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "664f12ab45cd7890ef123456",
            },
            title: {
              type: "string",
              example: "Complete API integration",
            },
            description: {
              type: "string",
              example: "Connect frontend with backend APIs",
            },
            status: {
              type: "string",
              example: "PENDING",
            },
            assignedTo: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
              },
            },
            createdBy: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
