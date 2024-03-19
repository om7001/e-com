import { merge } from "lodash"
import { colorResolver } from "./color.resolvers";
import { categoryResolver } from "./category.resolvers";
import { brandResolver } from "./brand.resolvers";
import { productResolver } from "./products.resolvers";
import { cartResolvers } from "./cart.resolvers";
import { orderResolvers } from "./order.resolvers";
import { userResolvers } from "./user.resolvers";
import { wishlistResolvers } from "./wishlist.resolvers";


const resolvers = merge(productResolver, brandResolver, colorResolver, categoryResolver, cartResolvers, orderResolvers, userResolvers, wishlistResolvers)

export default resolvers;