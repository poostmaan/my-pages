const fs = require("fs");

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
