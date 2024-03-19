import { user } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
// import { isAuthenticated } from '@/apollo/server/middleware';
import { isAuthenticated } from '@/apollo/server/middleware';


const login = async (_, { input }) => {
    const { email, password } = input;
    try {
        const userData = await user.findOne({ email });
        console.log("🚀 ~ login ~ userData:", userData);
        if (!userData) throw new Error("Wrong email or password");

        const isMatch = await userData.isPasswordCorrect(password);
        if (!isMatch) throw new Error("Wrong email or password");

        const accessToken = await userData.generateAccessToken();
        console.log("🚀 ~ login ~ accessToken:", accessToken);

        userData.accessToken = accessToken;
        return userData;
    } catch (error) {
        console.log(error);
        return {
            message: "User login failed",
            error: error.message
        };
    }
};


const createUser = async (_, { input }) => {
    try {
        console.log("🚀 ~ createUser ~ input:", input.email)

        const isExistingUser = await user.findOne({ email: input.email });
        if (isExistingUser) {
            return new Error("Email is already in use");
        }

        // input.role = await Role.findOne({ name: "user" }).select("_id");
        const userData = await user.create(input);
        if (!userData) {
            return new Error("Failed to create user");
        }
        console.log("🚀 ~ createUser ~ user:", userData)

        return "User created successfully";
    } catch (error) {
        console.error("Failed to create user:", error.message);
        return new Error("Failed to create user. Please try again later.");
    }
};

const getUsers = combineResolvers(
    isAuthenticated,
    async () => {
        try {
            const userData = await user.find()
            // .populate("order").populate("cart").populate("wishlist");
            if (!userData) {
                return new Error("User not found");
            }
            return userData;
        } catch (error) {
            console.error("Failed to fetch users:", error);
            return new Error("Failed to fetch users. Please try again later.");
        }
    });


const getUserById = combineResolvers(
    isAuthenticated,
    async (_, { _id }) => {
        try {
            const userData = await user.findById({_id})
                .populate([
                    { path: "orders" },
                    { path: "cart" },
                    { path: "wishlist" }
                ]);
            console.log("🚀 ~ userData:", userData)
            if (!userData) {
                throw new Error("User not found");
            }
            return userData;
        } catch (error) {
            console.error("Failed to fetch user by ID:", error);
            return new Error("Failed to fetch user. Please try again later.");
        }
    });


const updateUser = combineResolvers(
    isAuthenticated,
    async (_, { input }) => {
        try {
            const updatedUser = await user.findByIdAndUpdate(input._id, input, { new: true });
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return updatedUser;
        } catch (error) {
            console.error("Failed to update user:", error);
            return new Error("Failed to update user. Please try again later.");
        }
    });

const deleteUser = combineResolvers(
    isAuthenticated,
    async (_, { _id }) => {
        try {
            const deletedUser = await user.findByIdAndDelete(_id);
            if (!deletedUser) {
                throw new Error("User not found");
            }
            return deletedUser;
        } catch (error) {
            console.error("Failed to delete user:", error);
            return new Error("Failed to delete user. Please try again later.");
        }
    });

export const userResolvers = {
    Query: {
        getUsers,
        getUserById
    },
    Mutation: {
        login,
        createUser,
        updateUser,
        deleteUser
    }
};