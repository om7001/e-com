import { color } from "@/lib/models";


const getAllColor = async () => {
    try {
        const colorData = await color.find()
        if (!colorData) return new Error("Color Is Not Define")
        console.log("🚀 ~ getAllColor ~ colorData:", colorData)
        return colorData
    } catch (error) {
        console.log("🚀 ~ getAllColor ~ colorData:", error.message)
        return new Error(error.message)
    }
}

const addColor = async (_, args) => {
    try {
        const { name, hexCode } = args.input
        const colorData = await color.create({ name, hexCode })
        if (!colorData) return new Error("Color Is NOT Created")
        console.log("🚀 ~ addColor ~ colorData:", colorData)
        return colorData;
    } catch (error) {
        console.log("🚀 ~ addColor ~ colorData:", error.message)
        return new Error(error.message)
    }
}

export const colorResolver = {
    Query: {
        getAllColor
    },
    Mutation: {
        addColor
    }
}