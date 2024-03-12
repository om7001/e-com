import {category} from "@/lib/models";


const getAllCategory = async () => {
    try {
        const categoryData = await category.find()
        if (!categoryData) return new Error("Category Is Not Define")
        console.log("🚀 ~ getAllCategory ~ categoryData:", categoryData)
        return categoryData
    } catch (error) {
        console.log("🚀 ~ getAllCategory ~ categoryData:", error.message)
        return new Error(error.message)
    }
}

const addCategory = async (_, args) => {
    try {
        const { name } = args
        const categoryData = await category.create({name})
        if (!categoryData) return new Error("Category Is NOT Created")
        console.log("🚀 ~ addCategory ~ categoryData:", categoryData)
        return categoryData;
    } catch (error) {
        console.log("🚀 ~ addCategory ~ categoryData:", error.message)
        return new Error(error.message)
    }
}

export const categoryResolver = {
    Query: {
        getAllCategory
    },
    Mutation: {
        addCategory
    }
}