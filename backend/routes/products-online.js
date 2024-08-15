const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { OnlineProduct } = require("../db");
const { authMiddleware } = require("../middleware");
const multer = require("multer");
const { GridFSBucket } = require('mongodb');
const mongooseConnection = mongoose.connection;
const zod = require("zod");
const { readFileSync } = require("fs");
const path = require("path");
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post(
  "/create-product",
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
      productSchema.parse(parsedBody);

      // Create a new product document
      const newProduct = new OnlineProduct({
        ...parsedBody,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating product", error: error.message });
    }
  }
);

module.exports = router;





















router.get("/get-online-products", async (req, res) => {
  try {
    const products = await OnlineProduct.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error during fetching products:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});



const CartBody = zod.object({
  mode: zod.string().nonempty(),
  productId: zod.string().nonempty(),
  productQty: zod.number().positive(),
  productPrice: zod.string().nonempty(),
  productName: zod.string().nonempty(),
  productDescription: zod.string().nonempty(),
  productImages: zod.array(zod.string()).optional(), // Adjust according to your requirements
  category: zod.string().optional(),
  brand: zod.string().optional(),
  sku: zod.string().optional(),
  weight: zod.number().optional(),
  dimensions: zod.object({
    length: zod.number().optional(),
    width: zod.number().optional(),
    height: zod.number().optional(),
  }).optional(),
  inStock: zod.boolean().optional(),
  tags: zod.array(zod.string()).optional(),
  warranty: zod.string().optional(),
  color: zod.string().optional(),
  size: zod.string().optional(),
  material: zod.string().optional(),
  rating: zod.number().min(0).max(5).optional(),
});

router.post('/add-to-cart-online', authMiddleware, async (req, res) => {
  try {
    // Input validation check
    const userId = req.userId;
    const result = CartBody.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: 'Input specified in incorrect format',
        errors: result.error.errors,
      });
    }

    // When validation is successful, add item to the cart
    const {
      mode,
      productId,
      productQty,
      productPrice,
      productName,
      productDescription,
      productImages,
      category,
      brand,
      sku,
      weight,
      dimensions,
      inStock,
      tags,
      warranty,
      color,
      size,
      material,
      rating,
    } = result.data;

    const cartItem = new OnlineCart({
      userId,
      productId,
      productQty,
      productPrice,
      productName,
      productDescription,
      mode,
      productImages,
      category,
      brand,
      sku,
      weight,
      dimensions,
      inStock,
      tags,
      warranty,
      color,
      size,
      material,
      rating,
    });

    await cartItem.save();

    res.status(201).json({
      message: 'Item added to cart successfully',
    });
  } catch (error) {
    console.error('Error during adding product to cart:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});




  //put authMiddleware check here too

  router.get("/getitems-from-onlinecart-for-billing", async (req, res) => {
    try {
        const userId = req.query.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const CartProducts = await OnlineCart.find({ userId });

        res.status(200).json({ CartProducts });
    } catch (error) {
        console.error("Error during fetching products from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/getitems-from-onlinecart",authMiddleware, async (req, res) => {
  try {
      const userId = req.userId;

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const CartProducts = await OnlineCart.find({ userId });

      res.status(200).json({ CartProducts });
  } catch (error) {
      console.error("Error during fetching products from cart:", error);
      res.status(500).json({ message: "Internal server error" });
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