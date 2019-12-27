const { testConn } = require('../test-utils/testConn');
const { createReponse } = require('../graphql/resolvers/reponse');

let conn: Connection;

beforeAll(async () =>{
    conn= await testConn();

});
afterAll(() =>{

});