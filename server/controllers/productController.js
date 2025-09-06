import ProductService from "../services/productService.js";


const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const name = req.query.keywords;
      const category = req.query.category;
      const allProducts = await ProductService.getAllProducts(name, category);
      const newAllProducts = 
        allProducts.map((product) => ({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
          created_at: product.created_at,
        }))
      

      return res.json({ data: newAllProducts });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  getProductById: async (req, res) => {
    try {
      //   const collection = db.collection("products");
      //   const productId = new ObjectId(req.params.id);

      const productById = await ProductService.getProductById(req.params.id);
      if (!productById) {
        return res.status(404).json({message: "not found"});
      }
      const newProductById = {
        _id: productById._id,
        name: productById.name,
        price: productById.price,
        image: productById.image,
        description: productById.description,
        category: productById.category,
        created_at: productById.created_at,
      };

      return res.json({ data: newProductById });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  createProduct: async (req, res) => {
    const { name, price, image, description, category } = req.body;
    try {
      //   const collection = db.collection("products");

      const newProductData = await ProductService.createProduct({
        name,
        price,
        image,
        description,
        category,
      });
      return res.json({
        message: `Product Id ${newProductData.insertedId} has been created successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  updateProduct: async (req, res) => {
    const { name, price, image, description, category } = req.body;
    try {
      await ProductService.updateProduct(req.params.id, {
        name,
        price,
        image,
        description,
        category,
      });
      return res.json({
        message: `Product record ${req.params.id} has been updated successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await ProductService.deleteProduct(req.params.id);
      return res.json({
        message: `Product record ${req.params.id} has been deleted successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
};

export default ProductController;
