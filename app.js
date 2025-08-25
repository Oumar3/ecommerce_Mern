import dotenv from "dotenv";
dotenv.config();
//--------------------------------

// importation des package
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import {swaggerUi,swaggerSpec} from "./swagger.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRouters.js";

//initialisation de express
const app = express();

app.use(express.json());

// Sécurité HTTP
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "http://localhost:5000"],
//       scriptSrc: ["'self'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       // Ajoute d'autres sources selon tes besoins
//     },
// }));

// Protection NoSQL Injection


// Middleware
app.use(morgan("dev"));

// Middleware de journalisation

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec); // swaggerSpec = ton objet généré par swagger-jsdoc
});

export default app;