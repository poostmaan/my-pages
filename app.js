const express = require('express');
const path = require('path')
const http = require('http');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

const frontpage = path.resolve(__dirname, "./public");

const { dbConnect } = require('./database/config');
dbConnect();

app.use(express.static(frontpage));
app.use(express.json()); 

app.use('/pages', require('./routes/pages'));
app.use('/users', require('./routes/users'));

server.listen(process.env.PORT, function(err) {
    if(err) throw new Error(err);

    console.log(`Server is running on port: ${ this.address().port }`);
})