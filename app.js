import dotenv from "dotenv";
dotenv.config();
//--------------------------------

// importation des package
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import {swaggerUi,swaggerSpec} from "./swagger.js";
import productRoutes from "./routes/productRoutes.js";

//initialisation de express
const app = express();

app.use(express.json());

// Sécurité HTTP
app.use(helmet());

// Protection NoSQL Injection

// 3️⃣ Mongo-sanitize seulement pour req.body
app.use((req, res, next) => {
  const sanitize = obj => {
    for (let key in obj) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      }
    }
  };
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);   // ok, on ne touche que les clés
  if (req.params) sanitize(req.params);
  next();
});
// Protection XSS
app.use((req, res, next) => {
  if (req.body) {
    const sanitize = obj => {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = xss(obj[key]); // nettoie le contenu HTML/JS
        } else if (typeof obj[key] === 'object') {
          sanitize(obj[key]); // récursif
        }
      }
    };
    sanitize(req.body);
  }
  next();
});

// Middleware
app.use(morgan("dev"));

// Middleware de journalisation

app.use('/api/products', productRoutes);


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec); // swaggerSpec = ton objet généré par swagger-jsdoc
});

export default app;