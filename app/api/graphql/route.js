import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { connectDBHandler } from "@/lib/db";
import typeDefs from "@/apollo/server/typeDefs";
import resolvers from "@/apollo/server/resolvers";
import jwt from 'jsonwebtoken';
// import resolvers from "../../../";

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // formatError: (error) => {
//   //   const message = error.message
//   //     .replace('SequelizeValidationError: ', '')
//   //     .replace('Validation error: ', '')
//   //     .replace('Context creation failed: ', '')
//   //     .replace('Unexpected error value: ', '');
//   //   return { ...error, message };
//   // },
//   context: ({ req }) => {
//     const token = req.headers.authorization || '';
//     console.log("🚀 ~ token:", token)
    
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("🚀 ~ decoded:", decoded)
//       return { users: decoded };
//     } catch (error) {
//       console.log("🚀 ~ error:", error.message)
//       return new Error("Invalid token", error.message);
//     }
//   }

// });



const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});


const handler = connectDBHandler(startServerAndCreateNextHandler(apolloServer),{
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    console.log("🚀 ~ token:", token)
    
    try {
      if (!token) {
        throw new AuthenticationError('Token not provided');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🚀 ~ decoded:", decoded)
      return { users: decoded };
    } catch (error) {
      console.log("🚀 ~ error:", error.message)
      throw new Error("Invalid token");
    }
  }
});

// const handler = connectDBHandler(startServerAndCreateNextHandler(apolloServer, {
//   context: async (req, res) => ({ req, res, users: {} })
// }));

export { handler as GET, handler as POST };

// Add some logging
console.log("Server setup completed");