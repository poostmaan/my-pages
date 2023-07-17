const fs = require("fs");
const { v4: uuid } = require('uuid');

class PagesData {

  constructor() {
    this.file = "public/data/pages2.txt";
  }

  getData(callback) {
    fs.readFile(this.file, "utf8", (err, filedata) => {
      if (err) {
        callback({ status: 500, message: "Algo ocurrio al leer la data", data: null})
        return;
      }

      const data = JSON.parse(filedata)

      callback({ status: 200, message: "Consultado con exito", data })
    });
  }

  postData(newData, callback) {
    this.getData(( ({ data: oldData}) => {

      newData.uuid = uuid();

      const data = [ ...oldData, newData];

      const jsonData = JSON.stringify(data);

      fs.writeFile(this.file, jsonData, (err) => {
        if(err) {
          callback({ status: 500, message: "Algo ocurrio al escribir la data", data: null})
          return;
        }
      })

      callback({ status: 201, message: "Pagina creada", data })
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
