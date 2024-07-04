import Product from "../models/product.model.js";
import { OrderItemsType } from "../types/type.js";

export const reduceStock = async (orderItems: OrderItemsType[]) => {
  orderItems.forEach(async (items) => {
    const product = await Product.findById(items.productId);
    if (!product) throw new Error("Product not found");
    if (product.stock < items.quantity) throw new Error("Not enough stock");
    product.stock -= items.quantity;
    await product.save();
  });
};
