const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();

app.use(bodyParser.json());

// app.get('/', (req, res,next) => {
//     res.send('Salut le monde !');
// });
app.use('/api', graphQLHttp({
    schema: buildSchema('
        type RootQuery {
            annonces: [String!]
        }

        type RootMutation {
            createAnnonce(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    '),
    rootValue: {
        annonces: () => {
            return ['romantoc', 'Cooking','Sailing'];
        }
        createAnnonce: (args) =>{
            const annonceName = args.name;
        }
    }
}));

app.listen(3000);