const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

productSchema.indexes({title:"text",description:"text"})

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
