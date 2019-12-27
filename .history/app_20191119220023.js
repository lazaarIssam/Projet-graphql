const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res,next) => {
//     res.send('Salut le monde !');
// });
app.use('/api',graphQLHttp({
    
}));

app.listen(3000);