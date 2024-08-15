const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const zod = require("zod");
const { User, OnlineProduct,OnlineCart,OfflineProduct } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");
const multer = require("multer");
const { GridFSBucket } = require('mongodb');
const mongooseConnection = mongoose.connection;
const { readFileSync } = require("fs");
const path = require("path");
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post(
  "/create-product",
  authMiddleware,
  upload.array("productImages"),
  async (req, res) => {
    const productSchema = zod.object({
      productId: zod.string().nonempty(),
      productName: zod.string().nonempty(),
      productQty: zod.number().positive(),
      productPrice: zod.string().nonempty(), // Adjust if needed
      productDescription: zod.string().nonempty(),
      category: zod.string().nonempty(),
      brand: zod.string().nonempty(),
      sku: zod.string().nonempty(),
      weight: zod.string().nonempty(),
      dimensions: zod.string().nonempty(),
      inStock: zod.boolean(),
      tags: zod.array(zod.string()),
      warranty: zod.string().nonempty(),
      color: zod.string().nonempty(),
      size: zod.string().nonempty(),
      material: zod.string().nonempty(),
      rating: zod.number().optional()
    });

    try {
      // Convert types and process images
      const parsedBody = {
        ...req.body,
        productQty: Number(req.body.productQty),
        inStock: req.body.inStock === 'true', // Convert string to boolean
        tags: req.body.tags.split(','), // Convert string to array
        rating: req.body.rating ? Number(req.body.rating) : undefined, // Convert string to number
        productImages: req.files.map((file) => {
          // Convert image file buffer to base64 string
          return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        })
      };

      // Validate with Zod
      const result = productSchema.safeParse(parsedBody);
      if (!result.success) {
        return res.status(400).json({
          message: "Input specified in incorrect format",
          errors: result.error.errors
        });
      }

      // Create a new product document
      const newProduct = new OfflineProduct({
        mode: "offline",
        storeId: req.userId,
        ...parsedBody,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
      console.error("Error during creating product:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
);

module.exports = router;



  const querySchema = zod.object({
    // productId: zod.string().optional(),
    productName: zod.string().optional()
  });
  
  router.get("/get-offline-products",authMiddleware, async (req, res) => {
    try {
      const validatedQuery = querySchema.safeParse(req.query);
  
      if (!validatedQuery.success) {
        return res.status(400).json({ message: "Invalid query parameters" });
      }
  
      const { productName } = validatedQuery.data;
  
      const query = {};
    //   if (productId) query._id = productId; 
      if (productName) query.productName = { $regex: new RegExp(productName, 'i') }; // Case-insensitive search
  
      const products = await OfflineProduct.find(query);
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error during fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.get("/get-offline-products-for-users", async (req, res) => {
    try {
      const storeId =req.query.id;
      const validatedQuery = querySchema.safeParse(req.query);
  
      if (!validatedQuery.success) {
        return res.status(400).json({ message: "Invalid query parameters" });
      }
  
      const { productName } = validatedQuery.data;
  
      // Initialize the query with the storeId condition
      const query = { storeId }; 
  
      // Add the productName condition if it's provided
      if (productName) {
        query.productName = { $regex: new RegExp(productName, 'i') }; // Case-insensitive search
      }
  
      // Fetch the products that match the query conditions
      const products = await OfflineProduct.find(query);
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error during fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  

  



  
  router.post("/add-to-cart-offline", authMiddleware, async (req, res) => {
    try {
      // Input validation check
      const userId = req.userId;
      const result = CartBody.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Input specified in incorrect format",
        });
      }

  
      // When both checks are successful, add user to the database
      const Product = await OnlineCart.create({
        userId:userId,
        productId: req.body.productId,
        productQty:  req.body.productQty,
        productPrice:  req.body.productPrice,
        productName:  req.body.productName,
        productDescription:  req.body.productDescription
      });
  
      
     
  
      res.status(201).json({
        message: "Item added to cart successfully",
      });
    } catch (error) {
      console.error("Error during adding product to cart:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });


  router.get("/getitems-from-onlinecart-for-billing", authMiddleware, async (req, res) => {
    try {
      // Input validation check
      const userId = req.query.id;
      
      const CartProducts = await OnlineCart.find({ userId });
  
      // When both checks are successful, add user to the database
      res.status(200).json({
        CartProducts,
      })
    } catch (error) {
      console.error("Error during fetching products from cart:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  
  router.get("/getitems-from-onlinecart", authMiddleware, async (req, res) => {
    try {
      // Input validation check
      const userId = req.userId;
      
      const CartProducts = await OnlineCart.find({ userId });
  
      // When both checks are successful, add user to the database
      res.status(200).json({
        CartProducts,
      })
    } catch (error) {
      console.error("Error during fetching products from cart:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });



  router.delete('/delete-item/:id',authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      const result = await OnlineCart.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


  module.exports = router;