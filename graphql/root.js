/**
 * RootQueryType defines which fields we want to expose through /graphql
 * Also calls resolver function to get data from db
 */

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

// require types
const UserType = require("./user.js");
const get = require("../src/get.js")

let all = get.users();

// define fields to expose: users
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // field 'users'
        users: {
            // get.users() below receives a list, therefore GraphQLList
            type: GraphQLList(UserType), // which type to use
            description: 'List of all users', // description
            // 'course'
            resolve: async function() { // how to get data
                return await get.users(); // users objects array
            }
        },

        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                let users = await get.users();

                return users.find(user => user.email === args.email)

            }
        }
    })
});
  
module.exports = RootQueryType;

// return email of all users by query field users
// query {
//     users {
//       email
//     }
//   }


// find user with email by query field user, return allowed key 'email'
// query {
//     user(email: "joki20@student.bth.se") {
//       email
//     }
// }