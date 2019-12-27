const EasyGraphQLTester = require('easygraphql-tester');
const resolvers = require('../graphql/resolvers/annonce');

const schemaCode = require('../graphql/shema/index');
const tester = new EasyGraphQLTester(schemaCode);

const query = `
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
  typeUser: String!
  password: String
  createdAnnonces: [Annonce!]
  createdQuestions: [Question!]
  createdReponses: [Reponse!]
}

type AuthData {
  userId: ID!
  typeUser: String!
  token: String!
  tokenExpiration: Int!
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
  type Query {
    annonces{
      title
      creator{
        email
      }
      createdQuestions{
        title
        description
        creator{
          email
        }
        createdReponses{
          message
          user{
            email
          }
        }
      }
    }
  }
`;tester.test(true,query);
