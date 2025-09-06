const ProductValidation = {
  validateProduct: (req, res, next) => {
    const { name, price, image, description, category } = req.body;
    if (!name || typeof name !== "String") {
      return res
        .status(400)
        .json({ message: "name must be string and not empty" });
    }
    if (!price || typeof price !== "Number") {
      return res
        .status(400)
        .json({ message: "price must be number and not empty" });
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return res.status(400).json({
        message: "description must be number and not empty",
      });
    }

    if (description.trim().length < 10) {
      return res.status(400).json({
        message: "Description must be at least 10 characters long",
      });
    }

    if (
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Category is required and must be a string",
      });
    }

    next();
  },
};

export default ProductValidation