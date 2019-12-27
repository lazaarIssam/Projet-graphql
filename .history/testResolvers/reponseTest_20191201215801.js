const { testConn } = require('../test-utils/testConn');
const { createReponse } = require('../graphql/resolvers/reponse');

beforeAll(async () =>{
    await testConn;
})