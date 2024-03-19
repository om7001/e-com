import { color } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "@/apollo/server/middleware"


const getAllColor = combineResolvers(
  isAuthenticated,
  async () => {
    try {
      const colorData = await color.find()
      if (!colorData) return new Error("Color Is Not Define")
      console.log("🚀 ~ getAllColor ~ colorData:", colorData)
      return colorData
    } catch (error) {
      console.log("🚀 ~ getAllColor ~ colorData:", error.message)
      return new Error(error.message)
    }
  })

const addColor = combineResolvers(
  isAuthenticated,
  async (_, args) => {
    try {
      const { name, hexCode } = args.input

      if (!name || !hexCode) {
        return new Error("Color name and hex code are required.");
      }

      const existingColor = await color.findOne({ name, hexCode });
      if (existingColor) {
        return new Error("Color already exists!");
      }

      const colorData = await color.create({ name, hexCode })
      if (!colorData) return new Error("Color Is NOT Created")

      console.log("🚀 ~ addColor ~ colorData:", colorData)
      return colorData;
    } catch (error) {
      console.log("🚀 ~ addColor ~ colorData:", error.message)
      return new Error(error.message)
    }
  })

const updateColor = combineResolvers(
  isAuthenticated,
  async (_, { input }) => {
    try {
      const { _id, ...rest } = input;

      // Data validation
      if (!_id || (!rest.name && !rest.hexCode)) {
        return new Error("Invalid update input.");
      }

      // Update color
      const updatedColor = await color.findByIdAndUpdate(_id, { ...rest }, { new: true });
      if (!updatedColor) {
        return new Error("Color not found");
      }
      console.log("Updated color:", updatedColor);

      return updatedColor;
    } catch (error) {
      console.error("Error updating color:", error.message);
      return new Error("Failed to update color");
    }
  });

const deleteColor = combineResolvers(
  isAuthenticated, async (_, { _id }) => {
    try {
      // Delete color
      const deletedColor = await color.findByIdAndDelete(_id);
      if (!deletedColor) {
        return "Color not found";
      }
      console.log("Deleted color:", deletedColor);

      return "Color deleted successfully";
    } catch (error) {
      console.error("Error deleting color:", error.message);
      return new Error("Failed to delete color");
    }
  });



export const colorResolver = {
  Query: {
    getAllColor
  },
  Mutation: {
    addColor,
    updateColor,
    deleteColor
  }
}