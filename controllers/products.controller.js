import { Products } from "../models/products.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUtils.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const file = req.file;
    if (!title || !description || !price || !file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (isNaN(price)) {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a number" });
    }
    const imageUrl = await uploadToCloudinary(file.buffer);
    const newProduct = await Products.create({
      title,
      description,
      price: Number(price),
      imageUrl: imageUrl.secure_url,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// get simgle product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "no data provided to update",
      });
    }

    if (data.price && isNaN(data.price)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number",
      });
    }

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      data.imageUrl = imageUrl.secure_url;
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    // const updatedData = Object.assign(updatedProduct, data);
    // await updatedData.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
