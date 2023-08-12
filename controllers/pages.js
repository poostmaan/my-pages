const fs = require('fs');
const { PagesData } = require('../helpers/PagesData');
const Page = require('../models/page.model');
const pages = new PagesData();

const getPages = async(req, res) => {
  try{
    const data =  await Page.find({ user: req.id });

    let sections = [];
    data.forEach(e => {

      let index = sections.findIndex(f => f.section == e.section);
      if(index < 0) {
        sections.push({section: e.section, count: 1})
      } else {
        let { count } = sections[index];
        ++count;
        sections[index] = { ...sections[index], count};
      }
    
    })

    return res.status(200).json({ ok:true, data, sections })
  }catch(err){
    return res.status(500).json({ ok: false, error: [{ msg :"Something went Wrong!" + err}] });
  }
};

const postPages = async(req, res) => {
    const reqBody = req.body;

    try {

      const imageFile = req.file;
      
      const formData = new FormData();
      formData.append('image', imageFile.buffer.toString('base64') );

      const imgbb = await fetch(`https://api.imgbb.com/1/upload?key=943f42e5e7f02d7340e334c55fc2b8d3`, {
        method: "POST",
        body: formData
      });

      const imgbbRes = await imgbb.json();
      const { url: image } = imgbbRes.data.image

      const page = new Page({...reqBody, image});
      page.user = req.id;

      await page.save();

      const data =  await Page.find({ user: req.id });

      let sections = [];
      data.forEach(e => {

        let index = sections.findIndex(f => f.section == e.section);
        if(index < 0) {
          sections.push({section: e.section, count: 1})
        } else {
          let { count } = sections[index];
          ++count;
          sections[index] = { ...sections[index], count};
        }
      
      })
      
      return res.status(200).json({ ok: true, data, sections });

    } catch (err) {

      let msg = '';

      if(err == "TypeError: Cannot read properties of undefined (reading 'buffer')") {
        msg = "Image not sent"
      }

      return res.status(500).json({ ok: false, error: [{ msg }] });
    }

    
  
    // if(req.headers['content-type'] != 'application/json') {
    //   // SE QUE CUANDO HAYA UN CONTENT-TYPE ES PORQUE ESTOY ENVIANDO EL FORM DATA
    //   const imagen = "images/" + req.file.originalname;
    
    //   const target = process.env.TARGET_PATH+ req.file.originalname;
    
    //   let src = fs.createReadStream(req.file.path);
    //   let dest = fs.createWriteStream(target);
    
    //   src.pipe(dest);
    
    //   src.on('end', function(err) { 
    //     const newData = {url, imagen, section, description, created};
    
    //     pages.postData(newData, (data) => res.status(data.status).json(data));
    //   });
    
    //   src.on('error', function(err) { res.status(data.status).json({ err }); });
    //   return;
    // }
  
    // const newData = {
    //   author,
    //   authorUrl,
    //   created, 
    //   description, 
    //   imagen, 
    //   section, 
    //   src, 
    //   url, 
    // };

    // pages.postData(newData, (data) => res.status(data.status).json(data));
  
}

const deletePage = async(req, res) => {

    const { uuid } = req.params;
  
    try {
      
      const page = await Page.findById( uuid );

      if(!page) return res.status(404).json({ ok: false, error: [{ msg: "Page not found"}] })
      if(page.user.toString() !== req.id ) return res.status(401).json({ ok: false, error: [{ msg: "Permission denied"}] })

      await Page.findByIdAndDelete( uuid );

      res.status(204).json({ ok: true, error: [] })

    } catch (err) {
      return res.status(500).json({ ok: false, error: [{ msg: "Problem in deleting " + err}] })
    }
  
}

module.exports = {
    getPages,
    postPages,
    deletePage
}