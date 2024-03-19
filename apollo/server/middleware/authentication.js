const { skip } = require('graphql-resolvers')
import { user } from '@/lib/models';

// Auth
const isAuthenticated = async (_, args, {users}) => {
    console.log("🚀 ~ isAuthenticated ~ users:", users)
    try {
        const userData = await user.findById(users._id, { password: 0 });
        console.log("🚀 ~ isAuthenticated ~ userData:", userData)
        if (!userData) {
            return new Error('Not authenticated1');
        }
        skip
    } catch (error) {
        console.error(error);
        return new Error('Not authenticated');
    }
}
const isAuthenticatedAdmin = async (_, args, { users }) => {
    try {
        const userData = await user.findById(users._id, { password: 0 });
        if (!userData) {
            throw new Error('Not authenticated1');
        }
        if (userData.roll === 'admin') {
            skip
        } else {
            throw new Error('Not authenticated Admin');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Not authenticated2');
    }
}

module.exports = {
    isAuthenticated, isAuthenticatedAdmin
}