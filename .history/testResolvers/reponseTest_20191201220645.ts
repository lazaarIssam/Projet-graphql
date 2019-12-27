import { Connection, Schema } from "mongoose";
import { graphql } from "graphql";

const { testConn } = require('../test-utils/testConn');
const { createReponse } = require('../graphql/resolvers/reponse');

let conn: Connection;

beforeAll(async () =>{
    conn= await testConn();

});
afterAll(async () =>{
    await conn.close();
});

describe('createUser', () =>{
    it("create user ", () =>{
        
    })
})