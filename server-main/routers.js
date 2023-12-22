const express = require("express");
const Products = require("./Product_Module");
const fetch = require("node-fetch");
const router = express.Router();

// Fetching data from third party api and upload to database

router.get("/fetching", async (req, res) => {
  try {
    const thirdPartyDatas = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    if (!thirdPartyDatas.ok)
      return res
        .status(500)
        .json({ message: "Products not fetched from third party api" });

    const data = await thirdPartyDatas.json();

    const product = await Products.insertMany(data);
    if (!product)
      return res
        .status(500)
        .json({ message: "Products not inserted to database" });

    res.status(200).json({ message: "Products successfully fetched" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error - third party fetch ${error}`);
  }
});

// Get all products
router.get("/transactions", async (req, res) => {
  try {
    const { page, search, month } = req.query;

    // Filtering
    let query = {},
      option = {},
      limit = 10;
    if (search) {
      if (!isNaN(search)) {
        query = {
          price: { $lte: parseFloat(search) },
        };

        option = { price: -1 };
        limit = 4;
      } else {
        query = {
          $text: { $search: search, $caseSensitive: false },
        };

        option = { score: { $meta: "textScore" } };
      }
    }

    const totalProductsCount = await Products.countDocuments(query);

    const data = await Products.find(query)
      .sort(option)
      .skip((page - 1) * 10)
      .limit(limit);

    if (!isNaN(search) && search !== "")
      return res.status(200).json({ totalProductsCount: 4, products: data });

    res.status(200).json({
      totalProductsCount,
      products: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
});

// Api for selected month
router.get("/staticks", async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const totalSaleAmount = data.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const soldItem = data.filter((product) => product.sold === true).length;
    const notSoldItem = data.filter((product) => product.sold !== true).length;

    res.status(200).json({
      totalSaleAmount,
      soldItem,
      notSoldItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
});

// Price range for bar chart
router.get("/pricerange", async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const priceRanges = {
      "0 - 100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    data.map((product) => {
      const price = product.price;
      if (price <= 100) priceRanges["0 - 100"] += 1;
      else if (100 < price && price <= 200) priceRanges["101-200"] += 1;
      else if (200 < price && price <= 300) priceRanges["201-300"] += 1;
      else if (300 < price && price <= 400) priceRanges["301-400"] += 1;
      else if (400 < price && price <= 500) priceRanges["401-500"] += 1;
      else if (500 < price && price <= 600) priceRanges["501-600"] += 1;
      else if (600 < price && price <= 700) priceRanges["601-700"] += 1;
      else if (700 < price && price <= 800) priceRanges["701-800"] += 1;
      else if (800 < price && price <= 900) priceRanges["801-900"] += 1;
      else if (price > 900) priceRanges["901-above"] += 1;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
});

// API for pie chart
router.get("/piechart", async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const categories = {};

    data.map((product) => {
      if (categories[product.category]) {
        categories[product.category] += 1;
      } else {
        categories[product.category] = 1;
      }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
});

// API for fetche the data from all the 3 APIs
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Provide month" });

    // promise all for fetch all the link continusly fetching
    const [staticks, barChat, pieChar] = await Promise.all([
      fetch(`http://localhost:5000/api/staticks?month=${month}`).then(
        (response) => response.json()
      ),
      fetch(`http://localhost:5000/api/pricerange?month=${month}`).then(
        (response) => response.json()
      ),
      fetch(`http://localhost:5000/api/piechart?month=${month}`).then(
        (response) => response.json()
      ),
    ]);

    // response
    res.status(200).json({
      staticks,
      barChat,
      pieChar,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
});

module.exports = { ProductRouter: router };
