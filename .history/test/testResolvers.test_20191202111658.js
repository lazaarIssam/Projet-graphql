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

    test("Should get all the fields on getUsers", () => {
      const query = `
        {
          getUsers {
            email
            username
            fullName
            phone
          }
        }
      `;
      // First arg: true, the query is valid
      // Second arg: query to test
      tester.test(true, query);
    });
    test("Should be a valid mutation", () => {
      const mutation = `
        mutation CreateUsers {
          createUsers {
            email
          }
        }
      `;
      // First arg: true, the mutation is valid
      // Second arg: mutation to test
      // Third argument: Input value
      tester.test(true, mutation, [{
        email: "demo@demo.com",
        username: "demo",
        fullName: "demo name"
      }]);
    });
  });
});