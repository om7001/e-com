import { brand, product } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from "@/apollo/server/middleware"
import { isAuthenticated } from '@/apollo/server/middleware/authentication';


const getAllBrand = combineResolvers(
    isAuthenticated,
    async () => {
        try {
            const brandData = await brand.find()
            if (!brandData) return new Error("Brand Is Not Define")
            console.log("🚀 ~ getAllBrand ~ brandData:", brandData)
            return brandData
        } catch (error) {
            console.log("🚀 ~ getAllBrand ~ brandData:", error.message)
            return new Error(error.message)
        }
    })

const addBrand = combineResolvers(
    isAuthenticated,
    async (_, args) => {
        try {
            const { name } = args;

            if (!name) {
                return new Error("Brand name is required.");
            }

            const existingBrand = await brand.findOne({ name });
            if (existingBrand) {
                return new Error("Brand already exists!");
            }

            const brandData = await brand.create({ name })
            if (!brandData) return new Error("Brand Is NOT Creating")

            console.log("🚀 ~ addBrand ~ brandData:", brandData)
            return brandData;
        } catch (error) {
            console.log("🚀 ~ addBrand ~ brandData:", error.message)
            return new Error(error.message)
        }
    })

const updateBrand = combineResolvers(
    isAuthenticated,
    async (_, args) => {
        try {
            const { _id, name } = args;

            if (!name) {
                return new Error("Brand name is required.");
            }

            const updatedBrand = await brand.findByIdAndUpdate(_id, { name }, { new: true });
            if (!updatedBrand) {
                return new Error("Brand not found");
            }
            console.log("Updated brand:", updatedBrand);

            return updatedBrand;
        } catch (error) {
            console.error("Error updating brand:", error);
            return new Error("Failed to update brand");
        }
    });

const deleteBrand = combineResolvers(
    isAuthenticated, async (_, { _id }) => {
        try {

            const isAssigned = await product.findOne({ brand: _id });
            if (isAssigned) return new Error("this brand is assigned to products");

            const deletedBrand = await brand.findByIdAndDelete(_id);
            if (!deletedBrand) return new Error("Brand not found");
            console.log("Deleted brand:", deletedBrand);

            return "Brand deleted successfully";
        } catch (error) {
            console.error("Error deleting brand:", error);
            return new Error("Failed to delete brand");
        }
    });

export const brandResolver = {
    Query: {
        getAllBrand
    },
    Mutation: {
        addBrand,
        updateBrand,
        deleteBrand
    }
}