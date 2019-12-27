const { createConnection } = require('typeorm');

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    moduleResolution: "node",
    type: "mongodb",
    host: "localhost",
    port: 3000,
    username: ,
    password: "postgres",
    database: "typegraphql-example-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
};