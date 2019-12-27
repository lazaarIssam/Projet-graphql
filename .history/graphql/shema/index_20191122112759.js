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

        type Reponse {
            _id: ID!
            date: String!
            description: String!
            creator: User!
        }

        type Question {
            _id: ID!
            title: String!
            date: String!
            description: String!
            creator: User!
            createdResponses: [Reponse!]
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

        input QuestionInput {
            title: String!
            date: String!
            description: String!
            creator: User!
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