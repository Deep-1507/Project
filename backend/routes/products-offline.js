const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const zod = require("zod");
const { User, OnlineProduct,OnlineCart,OfflineProduct } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

const productBody = zod.object({
    productId: zod.string(),
    productQty: zod.number(),
    productPrice: zod.string(),
    productName: zod.string().min(1),
    productDescription: zod.string().min(1)
  });

  //Use Authmiddleware
  router.post("/create-product",authMiddleware, async (req, res) => {
    try {
      // Input validation check
      const result = productBody.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Input specified in incorrect format",
        });
      }

  
      
  
      // When both checks are successful, add user to the database
      const Product = await OfflineProduct.create({
        mode:"offline",
        storeId:req.userId,
        productId: req.body.productId,
        productQty:  req.body.productQty,
        productPrice:  req.body.productPrice,
        productName:  req.body.productName,
        productDescription:  req.body.productDescription
      });
  
      
      res.status(201).json({
        message: "Product created successfully",
      });
    } catch (error) {
      console.error("Error during creating product:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });



  const querySchema = zod.object({
    // productId: zod.string().optional(),
    productName: zod.string().optional()
  });
  
  router.get("/get-offline-products", async (req, res) => {
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