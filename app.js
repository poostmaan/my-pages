const express = require('express');
// const parser = require('body-parser');
const path = require('path')
const http = require('http');
const fs = require('fs');
const multer = require('multer');

const { PagesData } = require('./public/helpers/PagesData');

const app = express();
const server = http.createServer(app);

const frontpage = path.resolve(__dirname, "./public");
const upload = multer({ dest: 'upload/'});

const targetPath = "public/images/";
const pages = new PagesData();
app.use(express.static(frontpage));
// app.use(upload.none());

// app.use(parser.json());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.get('/pages', (req, res) => pages.getData(( data => res.status(data.status).json(data) )) );

app.post('/pages', upload.single('imagen'), (req, res) => {

  console.log(req.headers)
  const { url, description, section, imagen = '', src = '', author = '', authorUrl = '' } = req.body;
  const created = new Date().toLocaleDateString("es-ES");

  if(req.headers['content-type'] != 'application/json') {
    // SE QUE CUANDO HAYA UN CONTENT-TYPE ES PORQUE ESTOY ENVIANDO EL FORM DATA
    const imagen = "images/" + req.file.originalname;
  
    const target = targetPath + req.file.originalname;
  
    let src = fs.createReadStream(req.file.path);
    let dest = fs.createWriteStream(target);
  
    src.pipe(dest);
  
    src.on('end', function(err) { 
      const newData = {url, imagen, section, description, created};
  
      pages.postData(newData, (data) => res.status(data.status).json(data));
    });
  
    src.on('error', function(err) { res.status(data.status).json({ err }); });
    return;
  }

  const newData = {
    author,
    authorUrl,
    created, 
    description, 
    imagen, 
    section, 
    src, 
    url, 
  };
  pages.postData(newData, (data) => res.status(data.status).json(data));

 

});

app.delete("/pages/:uuid", (req, res) => {

  const { uuid } = req.params;

  pages.deletePageByUuid(uuid, (data) => res.status(data.status).json(data))

})

server.listen(58513, function(err) {
    if(err) throw new Error(err);

    console.log(`Server is running on port: ${ this.address().port }`);
})