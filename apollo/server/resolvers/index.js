import { merge } from "lodash"
import { colorResolver } from "./color.resolvers";
import { categoryResolver } from "./category.resolvers";
import { brandResolver } from "./brand.resolvers";
import { productResolver } from "./products.resolvers";


const resolvers = merge(productResolver, brandResolver, colorResolver, categoryResolver)

export default resolvers;