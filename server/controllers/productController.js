import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const name = req.query.keywords;
      const category = req.query.category;
      const query = {};
      if (name) {
        query.name = new RegExp(name, "i");
      }
      if (category) {
        query.category = new RegExp(category, "i");
      }
      const collection = db.collection("products");
      const allProducts = await collection.find(query).limit(10).toArray();

      const newAllProducts = [
        allProducts.map((product) => ({
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
        })),
      ];

      return res.json({ data: newAllProducts });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  getProductById: async (req, res) => {
    try {
      const collection = db.collection("products");
      const productId = new ObjectId(req.params.id);

      const productById = await collection.findOne({ _id: productId });
      const newProductById = {
        name: productById.name,
        price: productById.price,
        image: productById.image,
        description: productById.description,
        category: productById.category,
      };

      return res.json({ data: newProductById });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  createProduct: async (req, res) => {
    const {name,price, image,description,category} = req.body
    try {
      const collection = db.collection("products");
      const productData = { name,price, image,description,category, created_at: new Date() };
      const newProductData = await collection.insertOne(productData);
      return res.json({
        message: `Product Id ${newProductData.insertedId} has been created successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  updateProduct: async (req, res) => {
    const {name,price, image,description,category} = req.body
    try {
      const collection = db.collection("products");
      const newProductData = { name,price, image,description,category, modified_at: new Date() };
      const productId = new ObjectId(req.params.id);

      await collection.updateOne({ _id: productId }, { $set: newProductData });
      return res.json({
        message: `Movie record ${productId} has been updated successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const collection = db.collection("products");
      const productId = new ObjectId(req.params.id);

      await collection.deleteOne({ _id: productId });

      return res.json({
        message: `Movie record ${productId} has been deleted successfully`,
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  },
};

export default ProductController;
