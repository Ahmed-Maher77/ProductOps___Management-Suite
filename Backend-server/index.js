const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config({ debug: true });
const PORT = process.env.PORT || 6060;

// Initialize Express (Server)
const app = express();

// Import routes
const productRoutes = require("./routes/productRoutes");

// Import DB connection function
const startServerWithDB = require("./utils/serverManager");


// ======================= Middlewares =======================
app.use(express.json());     // Parse JSON request bodies
app.use(cors());   // Allow all origins


// ====================== Route Handlers ======================
// Home Page
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/homePage.html`);
})


// Product Routes
app.use("/api/products", productRoutes);


// Not Found - catch all unmatched routes
app.use((req, res) => {
	res.status(404);
	res.sendFile(`${__dirname}/views/notFound.html`);
});

// Start the server with database connection
startServerWithDB(app, PORT);