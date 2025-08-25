// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Options Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API POUR L'E-COMMERCE",
      version: "1.0.0",
      description: "Documentation de mon API avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000", // ton serveur
      },
    ],
  },
  apis: ["./routes/*.js"], // chemin vers tes routes documentées
};

// Générer la doc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };