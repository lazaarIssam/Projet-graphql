import { createConnection }= require('typeorm');

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    moduleResolution: "node",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "typegraphql-example-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
};