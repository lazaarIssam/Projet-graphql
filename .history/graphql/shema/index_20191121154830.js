const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Annonce {
            _id: ID!
            title: String!
            typedebien: String!
            statusPub: String!
            prix: Float!
            date: String!
            description: String!
            creator: User!
        }

        type User {
            _id: ID,
            email: String!
            password: String
            createdAnnonces: [Annonce!]
        }

        input AnnonceInput {
            title: String!
            typedebien: String!
            statusPub: String!
            prix: Float!
            date: String!
            description: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            annonces: [Annonce!]!
        }
        type RootMutation {
            createAnnonce(annonceInput: AnnonceInput): Annonce
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)