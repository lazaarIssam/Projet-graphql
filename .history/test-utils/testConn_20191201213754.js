import { createConnection } from "net"

export const testConn = () =>{
    return createConnection({
        name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "typegraphql-example-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]

    })
}