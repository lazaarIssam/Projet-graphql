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
        mutation createQuestion($annonceId: ID!) {
          createQuestion (annonceId: id) {
            title
          }
        }}
      `;
      tester.test(true, mutation, [{
        id:"5de1bc3084f6911ed8e27711",
        title: "test",
        date: "2019-11-22T11:14:46.131Z",
        description: "test",
        annonce: "5de1bc3084f6911ed8e27711",
        creator: "5de165141f63b02e88596745"
      }]);
    });

  });
});