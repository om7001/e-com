import { cart } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"

const getCartByUserId = combineResolvers(
    isAuthenticated,
    async (_, { userId }) => {
        try {
            const cartData = await cart.findOne({ user: userId })
                .populate([{
                    path: "products",
                }])
            return cartData;
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new Error("Failed to fetch cart");
        }
    });

const addToCart = combineResolvers(
    isAuthenticated,
    async (_, { userId, product }) => {
        try {
            const existingProduct = await cart.findOne({
                user: userId,
                "products.pid": product.pid,
                "products.color": product.color
            });

            if (existingProduct) {
                const cartData = await cart.findOneAndUpdate(
                    {
                        user: userId,
                        "products.pid": product.pid,
                        "products.color": product.color
                    },
                    {
                        $inc: { "products.$.qty": product.qty }
                    },
                    { new: true }
                );
                return cartData;
            } else {
                // If the product doesn't exist, add it to the cart
                const cartData = await cart.findOneAndUpdate(
                    { user: userId },
                    { $push: { products: product } },
                    { new: true, upsert: true }
                );
                return cartData;
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw new Error("Failed to add product to cart");
        }
    });

const removeFromCart = combineResolvers(
    isAuthenticated,
    async (_, { userId, productId, colorId }) => {
        try {
            // Remove the product with the given ID and color from the cart
            const cartData = await cart.findOneAndUpdate(
                {
                    user: userId,
                    "products.pid": productId,
                    "products.color": colorId
                },
                { $pull: { products: { pid: productId, color: colorId } } },
                { new: true }
            );
            return cartData;
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw new Error("Failed to remove product from cart");
        }
    });


export const cartResolvers = {
    Query: {
        getCartByUserId
    },
    Mutation: {
        addToCart,
        removeFromCart
    }
};