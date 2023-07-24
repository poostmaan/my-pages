const fs = require("fs");
const { v4: uuid } = require('uuid');

class PagesData {

  constructor() {
    this.file = "public/data/pages2.json";
  }

  getData(callback) {
    fs.readFile(this.file, "utf8", (err, filedata) => {
      if (err) {
        callback({ status: 500, message: "Algo ocurrio al leer la data", data: null})
        return;
      }

      if(filedata.length == 0) {
        callback({ status: 500, message: "No hay datos por leer", data: null})
        return;
      }

      const data = JSON.parse(filedata)

      const sections = [];

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

      callback({ status: 200, message: "Consultado con exito", data, sections })
    });
  }

  postData(newData, callback) {
    this.getData(( ({ data: oldData }) => {

      newData.uuid = uuid();

      let data = [newData];

      if(!!oldData) {
        data = [ ...oldData, newData];
      }
      
      const jsonData = JSON.stringify(data);

      fs.writeFile(this.file, jsonData, (err) => {
        if(err) {
          callback({ status: 500, message: "Algo ocurrio al escribir la data", data: null})
          return;
        }
      })

      const sections = [];

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

      callback({ status: 201, message: "Pagina creada", data, sections })
    }))
  }

  deletePageByUuid(uuid, callback){
    this.getData(( ({data}) => {

      const newData = data.filter( page => page.uuid !== uuid );

      if( data.length == newData.length) {
        callback({ status: 404, message: "No se encontro", data: null})
        return;
      }

      const jsonData = JSON.stringify(newData);

      fs.writeFile(this.file, jsonData, (err) => {
        if(err) {
          callback({ status: 500, message: "Algo ocurrio al escribir la data", data: null})
          return;
        }
      })

      callback({ status: 204, message: "Eliminado", data: null})


    }))
  }
}

module.exports = {
  PagesData,
};
