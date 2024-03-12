import { brand } from "@/lib/models";


const getAllBrand = async () => {
    try {
        const brandData = await brand.find()
        if (!brandData) return new Error("Brand Is Not Define")
        console.log("🚀 ~ getAllBrand ~ brandData:", brandData)
        return brandData
    } catch (error) {
        console.log("🚀 ~ getAllBrand ~ brandData:", error.message)
        return new Error(error.message)
    }
}

const addBrand = async (_, args) => {
    try {
        const { name } = args
        const brandData = await brand.create({name})
        if (!brandData) return new Error("Brand Is NOT Creating")
        console.log("🚀 ~ addBrand ~ brandData:", brandData)
        return brandData;
    } catch (error) {
        console.log("🚀 ~ addBrand ~ brandData:", error.message)
        return new Error(error.message)
    }
}

export const brandResolver = {
    Query: {
        getAllBrand
    },
    Mutation: {
        addBrand
    }
}