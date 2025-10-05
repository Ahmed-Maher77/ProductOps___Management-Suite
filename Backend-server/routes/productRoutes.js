const router = require("express").Router();
// Import Controllers
const productController = require("../controllers/productController");

// Get All Products
router.get("/", productController.getAllProducts);

// Add New Product
router.post("/addNewProduct", productController.addNewProduct);

// Update Product
router.put("/updateProduct/:id", productController.updateProduct);

// Delete Product
router.delete("/deleteProduct/:id", productController.deleteProduct);

// Search For Products
router.get("/searchProducts", productController.searchProducts);

// Admin Insights
router.get("/insights", productController.getInsights);

module.exports = router;
