const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, OnlineProduct } = require("../db");
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
  router.post("/create-product", async (req, res) => {
    try {
      // Input validation check
      const result = productBody.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Input specified in incorrect format",
        });
      }

  
      
  
      // When both checks are successful, add user to the database
      const Product = await OnlineProduct.create({
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

  router.get("/get-online-products", async (req, res) => {
    try {
        const Products = await OnlineProduct.find();
        res.status(200).json(Products);
      } catch (error) {
        console.error("Error during fetching products:", error);
        res.status(500).json({
          message: "Internal server error",
        });
      }
  });
  




  module.exports = router;