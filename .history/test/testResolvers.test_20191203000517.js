const EasyGraphQLTester = require('easygraphql-tester');
const resolvers = require('../graphql/resolvers/annonce');

const schemaCode = require('../graphql/shema/index');
//const tester = new EasyGraphQLTester(schemaCode);

describe("Test my schema", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
describe("Queries & Mutations", () => {
    test("notValidField is invalid on query", () => {
      const query = `
        {
          annonces {
            notValidField
          }
        }
      `;
      // First arg: false, there is no field notValidField
      // Second arg: query to test
      tester.test(false, query);
    });
    test("Should get all the fields on annonce", () => {
      const query = `
        {
          annonces{
            title
            creator{
              email
            }
            createdQuestions{
              title
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
      `;
      // First arg: false, there is no field notValidField
      // Second arg: query to test
      tester.test(true, query);
    });
    //----------------------------------------
    //------------- test create user
    test("Should be a valid createUser mutation", () => {
      const mutation = `
        mutation createUser {
          createUser {
            email
          }
        }
      `;
      // First arg: true, the mutation is valid
      // Second arg: mutation to test
      // Third argument: Input value
      tester.test(true, mutation, [{
        email: "demo@demo.com",
        typeUser: "client",
        password: "123"
      }]);
    });
    //------------- test create annonce
    test("Should be a valid createAnnonce mutation", () => {
      const mutation = `
        mutation createAnnonce {
          createAnnonce {
            title
          }
        }
      `;
      // First arg: true, the mutation is valid
      // Second arg: mutation to test
      // Third argument: Input value
      tester.test(true, mutation, [{
        title: "test",
        typedebien: "test",
        statusPub: "statusTest",
        prix: 20.00,
        date: "2019-11-22T11:14:46.131Z",
        description: "Test",
        creator: "5de165141f63b02e88596745"
      }]);
    });

    //------------- test create question
    test("Should be a valid createQuestion mutation", () => {
      const mutation = `
        mutation createQuestion($annonceId: ID!, $input: QuestionInput!) {
          createQuestion (annonceId: $annonceId,questionInput: $input) {
            title
          }
        }
      `;
      const input = {
        annonceId: "5de1bc3084f6911ed8e27711",
        input: {
          title: 'test',
          date: '2019-11-20T00:02:50.784Z',
          description: 'tesst'
        }
      }
      
      const { data: { createQuestion } } = tester.mock({ query: mutation, variables: input })
    });
    //----------------------------
    test("Should be a valid createReponse mutation", () => {
      const mutation = `
        mutation createReponse($questionId: ID!, $input: String!) {
          createReponse (questionId: $questionId,message: $input) {
            message
          }
        }
      `;
      const input = {
        questionId: "5de2ec907511092360dc83c0",
        input: "test"
      }
      
      const { data: { createReponse } } = tester.mock({ query: mutation, variables: input })
    });
    //------------- test login
    test("Should be a valid login query", () => {
      const query = `
        mutation createReponse($questionId: ID!, $input: String!) {
          createReponse (questionId: $questionId,message: $input) {
            message
          }
        }
      `;
      const input = {
        questionId: "5de2ec907511092360dc83c0",
        input: "test"
      }
      
      const { data: { createReponse } } = tester.mock({ query: query, variables: input })
    });
    //------------------------------
    test("Should be a valid updateAnnonce mutation", () => {
      const mutation = `
        mutation updateAnnonce($annonceId: ID!, $input: AnnonceUpdateInput!) {
          updateAnnonce (annonceId: $annonceId,annonceUpdateInput: $input) {
            title
          }
        }
      `;
      const input = {
        annonceId: "5de1bc3084f6911ed8e27711",
        input: {
          title: "test",
          typedebien: "test",
          statusPub: "statusTest",
          prix: 20.00,
          date: "2019-11-22T11:14:46.131Z",
          description: "Test",
        }
      }
      
      const { data: { updateAnnonce } } = tester.mock({ query: mutation, variables: input })
    });
    //--------------------------------------
    test("Should be a valid deleteAnnonce mutation", () => {
      const mutation = `
        mutation deleteAnnonce($annonceId: ID!) {
          deleteAnnonce (annonceId: $annonceId) {
            email
          }
        }
      `;
      const input = {
        annonceId: "5de2ec907511092360dc83c0"
      }
      
      const { data: { createReponse } } = tester.mock({ query: mutation, variables: input })
    });
    
  });
});