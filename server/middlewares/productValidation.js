const ProductValidation = {
  validateProduct: (req, res, next) => {
    const { name, price, image, description, category } = req.body;
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "name must be string and not empty" });
    }


    if (!price || typeof Number(price) !== "number" || price <= 0) {
      return res.status(400).json({
        message: "Price must be a positive number",
      });
    }


    if (!image || typeof image !== "string" || image.trim().length === 0) {
      return res.status(400).json({
        message: "Product image is required and must be a string",
      });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return res.status(400).json({
        message: "description must be string and not empty",
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

export default ProductValidation;