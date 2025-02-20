const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Management API',
      version: '1.0.0',
      description: 'API documentation for the Vehicle Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
      parameters: {
        AcceptLanguage: {
          in: 'header',
          name: 'Accept-Language',
          description: 'Language code (e.g., en, ar, fr)',
          required: false,
          schema: {
            type: 'string'
          }
        }
    }
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Operations related to users',
      },
      {
        name: 'Vehicles',
        description: 'Operations related to vehicles',
      },
      {
        name: 'Maintenance',
        description: 'Operations for user maintenance'
      }
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
