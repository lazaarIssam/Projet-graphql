import { createConnection } from "net"

export const testConn = () =>{
    return createConnection({
        name: "default",
        
    })
}