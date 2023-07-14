const express = require('express');
const path = require('path')
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

const frontpage = path.resolve(__dirname, "./public");

app.use(express.static(frontpage));

app.get('/data', (req, res) => {

    fs.readFile('./public/data/pages2.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          return;
        }

        const pages = JSON.parse(data);
        res.json(pages)
      });

})

server.listen(58513, function(err) {
    if(err) throw new Error(err);

    console.log(`Server is running on port: ${ this.address().port }`);
})