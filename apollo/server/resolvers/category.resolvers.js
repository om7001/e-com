import { category, product } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"


const getAllCategory = combineResolvers(
    isAuthenticated,
    async () => {
        try {
            const categoryData = await category.find()
            if (!categoryData) return new Error("Category Is Not Define")
            console.log("🚀 ~ getAllCategory ~ categoryData:", categoryData)
            return categoryData
        } catch (error) {
            console.log("🚀 ~ getAllCategory ~ categoryData:", error.message)
            return new Error(error.message)
        }
    })

const addCategory = combineResolvers(
    isAuthenticated,
    async (_, args) => {
        try {
            const { name } = args

            if (!name) {
                return new Error("Category name is required.");
            }

            const existingCategory = await category.findOne({ name });
            if (existingCategory) {
                return new Error("Category already exists!");
            }

            const categoryData = await category.create({ name })
            if (!categoryData) return new Error("Category Is NOT Created")

            console.log("🚀 ~ addCategory ~ categoryData:", categoryData)
            return categoryData;
        } catch (error) {
            console.log("🚀 ~ addCategory ~ categoryData:", error.message)
            return new Error(error.message)
        }
    })

const updateCategory = combineResolvers(
    isAuthenticated, 
    async (_, { _id, name }) => {
        try {
            if (!name) {
                return new Error("Category name is required.");
            }

            const updatedCategory = await category.findByIdAndUpdate(_id, { name }, { new: true });
            if (!updatedCategory) {
                return new Error("Category not found");
            }
            console.log("Updated category:", updatedCategory);

            return updatedCategory;
        } catch (error) {
            console.error("Error updating category:", error);
            return new Error("Failed to update category");
        }
    });

const deleteCategory = combineResolvers(
    isAuthenticated, 
    async (_, { _id }) => {
        try {
            const isAssigned = await product.findOne({ category: _id });
            if (isAssigned) return new Error("this category is assigned to products");

            const deletedCategory = await category.findByIdAndDelete(_id);
            if (!deletedCategory) return new Error("Category not found");

            console.log("Deleted category:", deletedCategory);

            return "Category deleted successfully";
        } catch (error) {
            console.error("Error deleting category:", error);
            return new Error("Failed to delete category");
        }
    });

export const categoryResolver = {
    Query: {
        getAllCategory
    },
    Mutation: {
        addCategory,
        updateCategory,
        deleteCategory
    }
}