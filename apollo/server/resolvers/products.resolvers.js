import { product } from "@/lib/models"
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"
// import brand from "@/lib/models/brand.models"


const getAllProduct = combineResolvers(
    isAuthenticated,
    async () => {
        try {
            const productData = await product.find()
                .populate([
                    { path: "brand", select: "name" },
                    { path: "category", select: "name" },
                    { path: "colors", select: "name hexCode" }
                ]);
            if (!productData) return new Error("Products Is NOT Define");
            return productData
        } catch (error) {
            console.log("🚀 ~ getAllProduct ~ getAllProduct:", error.message);
            return new Error(error.message);
        }
    })

const getProduct = combineResolvers(
    isAuthenticated,
    async (_, args) => {
        try {
            const id = args;
            console.log("🚀 ~ getProduct ~ args:", args);
            const productData = await product.findById(id)
                .populate([
                    { path: "brand", select: "name" },
                    { path: "category", select: "name" },
                    { path: "colors", select: "name hexCode" }
                ]);
            if (!productData) return new Error("Product is not defined");
            console.log("🚀 ~ getProduct ~ productData:", productData);
            return productData;
        } catch (error) {
            console.log("🚀 ~ getProduct ~ error:", error.message);
            throw new Error(error.message);
        }
    });



const addProducts = combineResolvers(
    isAuthenticated,
    async (_, args) => {
        try {
            const { input } = args
            const productSku = await product.findOne({ sku: input.sku })
            if (productSku) return new Error("This Sku Is already Define")
            console.log("🚀 ~ addProducts ~ productSku:", productSku)

            // const productBrand = await brand.findById(input.brand)
            // if (!productBrand) return new Error("This Brand Is NOT Define")
            // console.log("🚀 ~ addProducts ~ productBrand:", productSku)


            const productData = await product.create(input)
            if (!productData) return new Error("Product Is NOT Created")
            console.log("🚀 ~ addProducts ~ productData:", productData)
            return productData;
        } catch (error) {
            console.log("🚀 ~ addProducts ~ productData:", error.message)
            return new Error(error.message)
        }
    })


export const productResolver = {
    Query: {
        getAllProduct,
        getProduct
    },
    Mutation: {
        addProducts
    }
}