const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000, () => {
    console.log(`Server started on port`);
});