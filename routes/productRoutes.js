import { Router } from "express";
import { getProduct, getProductById, createProduct,updateProduct } from "../controllers/productControllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour gérer les produits
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 *         - image
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant auto-généré du produit
 *         name:
 *           type: string
 *           description: Nom du produit
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: number
 *         image:
 *           type: string
 *         userId:
 *           type: string
 *           description: Référence à l'utilisateur propriétaire
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60c72b2f9b1d4c001f9f5b1a
 *         name: iPhone 15 Pro
 *         description: Smartphone haut de gamme
 *         price: 1200
 *         stock: 50
 *         image: https://example.com/iphone15.jpg
 *         userId: 60c72b2f9b1d4c001f9f5b1b
 *         createdAt: 2025-08-24T10:00:00Z
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Données invalides
 */
router.post("/", createProduct);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mettre à jour un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Produit non trouvé
 */
router.put("/:id", updateProduct);

export default router;
