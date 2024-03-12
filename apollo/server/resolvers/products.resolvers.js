import { product } from "@/lib/models"
// import brand from "@/lib/models/brand.models"


const getAllProduct = async () => {
    try {
        const productData = await product.find()
            .populate([
                { path: "brand", select: "name" },
                { path: "category", select: "name" },
                // { path: "color", select: "name" }
            ]);
        if (!productData) return new Error("Products Is NOT Define");
        console.lo);
        return productData
    } catch (error) {
        console.log("🚀 ~ getAllProduct ~ getAllProduct:", error.message);
        return new Error(error.message);
    }
}
const getProduct = async (_, args) => {
    try {
        const id = args;
        console.log("🚀 ~ getProduct ~ args:", args);
        const productData = await product.findById(id)
            .populate([
                { path: "brand", select: "name" },
                { path: "category", select: "name" },
                // { path: "color", select: "name" }
            ]);
        if (!productData) return new Error("Product is not defined");
        console.log("🚀 ~ getProduct ~ productData:", productData);
        return productData;
    } catch (error) {
        console.log("🚀 ~ getProduct ~ error:", error.message);
        throw new Error(error.message);
    }
};


const addProducts = async (_, args) => {
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
}


export const productResolver = {
    Query: {
        getAllProduct,
        getProduct
    },
    Mutation: {
        addProducts
    }
}