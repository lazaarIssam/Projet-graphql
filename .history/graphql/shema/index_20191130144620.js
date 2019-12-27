const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Reponse {
            _id: ID!
            question: Question!
            user: User!
            message: String!
            createdAt: String!
            updatedAt: String! 
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
            createdQuestions: [Question!]
        }

        type User {
            _id: ID,
            email: String!
            password: String
            createdAnnonces: [Annonce!]
            createdQuestions: [Question!]
            createdReponses: [Reponse!]
        }

        type Question {
            _id: ID!
            title: String!
            date: String!
            description: String!
            creator: User!
            createdReponses: [Reponse!]
            annonce: Annonce!
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
            updateAnnonce(annonceId: ID!,annonceInput: AnnonceInput): Annonce 
            createUser(userInput: UserInput): User
            createQuestion(annonceId: ID!,questionInput: QuestionInput): Question
            createReponse(questionId: ID!,message: String!): Reponse
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)