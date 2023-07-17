const fs = require("fs");
const { v4: uuid } = require('uuid');

class PagesData {

  constructor() {
    this.file = "public/data/pages2.txt";
  }

  getData(callback) {
    fs.readFile(this.file, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return;
      }

      callback(JSON.parse(data))
    });
  }

  postData(newData, callback) {
    this.getData(( oldData => {

      newData.uuid = uuid();

      const data = [ ...oldData, newData];

      const jsonData = JSON.stringify(data);

      fs.writeFile(this.file, jsonData, (err) => {
        if(err) {
          console.log("algo ocurrio", err);
          return;
        }
      })

      callback(data);
    }))
  }
}

module.exports = {
  PagesData,
};
