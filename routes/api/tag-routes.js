const router = require("express").Router();
const { response } = require("express");
const { Tag, Product, ProductTag } = require("../../models");
const { findByPk } = require("../../models/Product");

// The `/api/tags` endpoint

// GET all Tags
router.get("/", async (req, res) => {
  // Return Tags with its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tags_product" }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single Tag
router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(
      req.params.id,
      // return tag and products
      {
        include: [{ model: Product, through: ProductTag, as: "tags_product" }],
      }
    );

    // Return Error Message if no tag is found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    // Else Return tag Object
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE tag
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      req.status(404).json({ message: "That Tag doesn't exist!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE tag
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Return Error Message if no product is found
    if (!tagData) {
      res.status(404).json({ message: "That Tag doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
