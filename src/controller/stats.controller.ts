import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.models.js";
import { calculatePercentage } from "../utils/feature.js";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let stats;
    const today = new Date();
    const sixMonthAgo = new Date().setMonth(today.getMonth() - 6);

    const currentMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const currentMonthProductsPromise = Product.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const currentMonthUsersPromise = User.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });
    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const currentMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });
    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: lastMonth.end,
      },
    });
    const latestTransactionPromise = Order.find({})
      .select(["_id", "products", "discount", "total", "status"])
      .limit(4)
      .sort({ createdAt: -1 });

    const [
      currentMonthProducts,
      lastMonthProducts,
      currentMonthUsers,
      lastMonthUsers,
      currentMonthOrders,
      lastMonthOrders,
      productsCount,
      usersCount,
      allOrders,
      lastSixMonthOrders,
      categories,
      maleUserCount,
      femaleUserCount,
      latestTransaction,
    ] = await Promise.all([
      currentMonthProductsPromise,
      lastMonthProductsPromise,
      currentMonthUsersPromise,
      lastMonthUsersPromise,
      currentMonthOrdersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ gender: "male" }),
      User.countDocuments({ gender: "female" }),
      latestTransactionPromise,
    ]);

    const userChangePercent = calculatePercentage(
      currentMonthUsers.length,
      lastMonthUsers.length
    );
    const orderChangePercent = calculatePercentage(
      currentMonthOrders.length,
      lastMonthOrders.length
    );
    const productChangePercent = calculatePercentage(
      currentMonthProducts.length,
      lastMonthProducts.length
    );
    const currentMonthRevenue = currentMonthOrders.reduce((acc, order) => {
      return acc + order.total;
    }, 0);
    const lastMonthRevenue = lastMonthOrders.reduce((acc, order) => {
      return acc + order.total;
    }, 0);
    const revenueChangePercent = calculatePercentage(
      currentMonthRevenue,
      lastMonthRevenue
    );

    const monthlyChangePercentage = {
      revenue: revenueChangePercent,
      product: productChangePercent,
      user: userChangePercent,
      order: orderChangePercent,
    };

    const revenue = allOrders.reduce((acc, order) => {
      return acc + order.total;
    }, 0);
    const count = {
      revenue,
      user: usersCount,
      product: productsCount,
      order: allOrders.length,
    };
    const orderMonthsCount = new Array(6).fill(0);
    const orderMonthlyRevenue = new Array(6).fill(0);
    lastSixMonthOrders.forEach((order) => {
      const creationDate = new Date(order.createdAt);
      const monthDiffrence = today.getMonth() - creationDate.getMonth();
      if (monthDiffrence < 6) {
        orderMonthsCount[6 - monthDiffrence - 1] += 1;
        orderMonthlyRevenue[6 - monthDiffrence - 1] += order.total;
      }
    });
    const categoriesCountPromise = categories.map((category) => {
      return Product.countDocuments({ category });
    });
    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCountPercentage: Record<string, number>[] = [];
    categories.forEach((category, ind) => {
      categoryCountPercentage.push({
        [category]: Math.round((categoriesCount[ind] / productsCount) * 100),
      });
    });

    const humanRatio = {
      male: maleUserCount,
      female: femaleUserCount,
    };

    stats = {
      categoryCountPercentage,
      monthlyChangePercentage,
      count,
      chart: {
        order: orderMonthsCount,
        revenue: orderMonthlyRevenue,
      },
      humanRatio,
      latestTransaction,
    };
    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to get dashboard stats", 500));
  }
};

export const getPieCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    return next(new ErrorHandler("Failed to get pie charts stats", 500));
  }
};

export const getLineCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    return next(new ErrorHandler("Failed to get line charts stats", 500));
  }
};

export const getBarCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    return next(new ErrorHandler("Failed to get bar charts stats", 500));
  }
};

// 5.43--min
