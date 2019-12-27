const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res,next) => {
//     res.send('Salut le monde !');
// });
app.use('/api',graphQLHttp({
    schema: null,
    rootValue: {}
}));

app.listen(3000);