const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findByPk } = require("../../models/Product");

// The `/api/categories` endpoint

//GET all categories
router.get("/", async (req, res) => {
  // find all categories

  try {
    const categoryData = await Category.findAll(
      // be sure to include its associated Products
      {
        include: [{ model: Product }],
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Return error if no Category found
    if (!categoryData) {
      res.status(404).json({ message: "No Category found with this id!" });
    }

    // Else Return Category Object
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      req.status(404).json({ message: "That Category doesn't exist!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Return Error Message if no product is found
    if (!categoryData) {
      res.status(404).json({ message: "That Category doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
