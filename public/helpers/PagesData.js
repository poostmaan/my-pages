const fs = require("fs");

class PagesData {
  getData(callback) {
    fs.readFile("public/data/pages2.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return;
      }

      callback(JSON.parse(data))
    });
  }

  postData(data, callback) {
    this.getData(( oldData => {
      oldData.push(data)
      callback(oldData);
    }))
  }
}

module.exports = {
  PagesData,
};
