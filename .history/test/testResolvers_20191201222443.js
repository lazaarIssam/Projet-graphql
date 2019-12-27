const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')

const tester = new EasyGraphQLTester(schemaCode)