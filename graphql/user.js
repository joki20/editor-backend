/**
 * Define how a user will be exposed and what fields to expose
 * If field from dadtabase is same as answer from GraphQL, no resolve is needed
 */

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

// create a new type for each list

const UserType = new GraphQLObjectType({
    name: 'User', // name must equal USERType
    description: 'This represents a user',
    fields: () => ({
        // specify allowed keys to return
        email: {
            type: GraphQLString
        },
        // docs value is a list
        docs: {
            type: GraphQLList(DocsType)
        }
    })
})

const DocsType = new GraphQLObjectType({
    name: 'Docs',
    description: 'This represents docs for a user',
    fields: () => ({
        // specify allowed keys to return
        id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        allowed_users: {
            type: GraphQLList(Allowed_UsersType),
        }
    })
})

const Allowed_UsersType = new GraphQLObjectType({
    name: 'Allowed_Users',
    description: 'This represents allowed users for a doc',
    fields: () => ({
        // specify allowed keys to return
        email: {
            type: GraphQLString
        }
    })
})

module.exports = UserType;


// ADJUSTED DB WITH ALLOWED USERS KEY
// {
// 	"_id": {
// 		"$oid": "61631746cab3d5fde969ba7d"
// 	},
// 	"Users": [{
// 		"email": "joki20@student.bth.se",
// 		"password": "$2a$09$tihtbxPFSSFBOJ7mn20gyuAQYoweN81zVdM3z1odP44drKhgpbi76",
// 		"docs": [{
// 			"id": "616315285ebfcb13bacec332",
// 			"title": "Den lille pige med svovlstikkerne",
// 			"content": "<p>Der var engang en liten flikke</p><p><br></p><p>hej</p>",
//             "allowed_users": [
//                 {
//                     "email": "joki20@student.bth.se"
//                 },
//                 {
//                     "email": "abc@student.bth.se"
//                 }
//             ]
// 		}]
// 	}, {
// 		"email": "abc@student.bth.se",
// 		"password": "$2a$09$3mKfFqXD0lgLyOeBKFqk4uzknzu7rr3EzNU/.V9XCervJ7c0A8Mei",
// 		"docs": []
// 	}, {
// 		"email": "johan@student.bth.se",
// 		"password": "$2a$09$ik.zN7Egd7g2bKe4nj4GZu3BsrOA7I.Y.UnToHLKuJyunHHsl7Sfu",
// 		"docs": []
// 	}]
// }