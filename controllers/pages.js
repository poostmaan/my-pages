const { PagesData } = require('../helpers/PagesData');
const pages = new PagesData();

const getPages = (req, res) => pages.getData(( data => res.status(data.status).json(data) ));

const postPages = (req, res) => {

    console.log(req.headers)
    const { url, description, section, imagen = '', src = '', author = '', authorUrl = '' } = req.body;
    const created = new Date().toLocaleDateString("es-ES");
  
    if(req.headers['content-type'] != 'application/json') {
      // SE QUE CUANDO HAYA UN CONTENT-TYPE ES PORQUE ESTOY ENVIANDO EL FORM DATA
      const imagen = "images/" + req.file.originalname;
    
      const target = process.env.TARGET_PATH+ req.file.originalname;
    
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
  
}

const deletePage = (req, res) => {

    const { uuid } = req.params;
  
    pages.deletePageByUuid(uuid, (data) => res.status(data.status).json(data))
  
}

module.exports = {
    getPages,
    postPages,
    deletePage
}