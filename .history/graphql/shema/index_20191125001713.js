const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type reponse {
            question: Question!
            user: User!
            message: String!
        }
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
            createdQuestions: [Question!]
        }

        type Question {
            _id: ID!
            title: String!
            date: String!
            description: String!
            creator: User!
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
        }

        type RootQuery {
            annonces: [Annonce!]!
            questions: [Question!]!
        }
        type RootMutation {
            createAnnonce(annonceInput: AnnonceInput): Annonce
            createUser(userInput: UserInput): User
            createQuestion(questionInput: QuestionInput): Question
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)