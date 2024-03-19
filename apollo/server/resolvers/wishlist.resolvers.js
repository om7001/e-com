import { wishlist } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"

const getWishlist = combineResolvers(
    isAuthenticated,
    async (_, { userId }) => {
        try {
            const wishlistData = await wishlist.findOne({ user: userId }).populate("products").populate("user");
            return wishlistData;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            throw new Error("Failed to fetch wishlist");
        }
    });

const addToWishlist = combineResolvers(
    isAuthenticated,
    async (_, { userId, productId }) => {
        try {
            const wishlistData = await wishlist.findOneAndUpdate(
                { user: userId },
                { $addToSet: { products: productId } },
                { new: true, upsert: true }
            ).populate("products").populate("user");

            return wishlistData;
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
            throw new Error("Failed to add product to wishlist");
        }
    });

const removeFromWishlist = combineResolvers(
    isAuthenticated,
    async (_, { userId, productId }) => {
        try {
            const wishlistData = await wishlist.findOneAndUpdate(
                { user: userId },
                { $pull: { products: productId } },
                { new: true }
            ).populate("products").populate("user");
            return wishlistData;
        } catch (error) {
            console.error("Error removing product from wishlist:", error);
            throw new Error("Failed to remove product from wishlist");
        }
    });

export const wishlistResolvers = {
    Query: {
        getWishlist
    },
    Mutation: {
        addToWishlist,
        removeFromWishlist
    }
};