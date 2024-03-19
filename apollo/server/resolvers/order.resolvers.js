import { order } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"

const getOrderByUserId = combineResolvers(
    isAuthenticated,
    async (_, { userId }) => {
        try {
            const orderData = await order.findOne({ user: userId })
            // .populate({
            //     path: "order",
            //     // populate: { path: "color" }
            // })
            // .populate("user");
            return orderData;
        } catch (error) {
            console.error("Error fetching order:", error);
            throw new Error("Failed to fetch order");
        }
    });

const getAllOrders = combineResolvers(
    isAuthenticated,
    async () => {
        try {
            const orderData = await order.find()
                .populate({
                    path: 'products.pid',
                    // populate: { path: 'color' }
                })
            // .populate('user');
            if (!orderData) {
                return new Error("Orders Is NOT Define");
            }
            return orderData;
        } catch (error) {
            console.error("Error fetching all orders:", error);
            return new Error("Failed to fetch orders");
        }
    });

const createOrder = combineResolvers(
    isAuthenticated,
    async (_, { input }) => {
        console.log("🚀 ~ createOrder ~ input:", input)
        try {
            const orderData = await order.create(input);
            console.log("🚀 ~ createOrder ~ orderData:", orderData)
            if (!orderData) {
                return new Error("Failed to create order1");
            }
            return "order Created";
        } catch (error) {
            console.error("Error creating order:", error);
            return new Error("Failed to create order");
        }
    });

export const orderResolvers = {
    Query: {
        getOrderByUserId,
        getAllOrders
    },
    Mutation: {
        createOrder
    }
};