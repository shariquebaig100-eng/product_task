require('dotenv').config();
const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
