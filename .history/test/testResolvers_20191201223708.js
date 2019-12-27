const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')
const tester = new EasyGraphQLTester(schemaCode)

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
          description
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

tester.test(true,query);