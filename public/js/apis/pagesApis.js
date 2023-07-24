const pages = new Pages()
const section = new Section();

async function getPages(){
    try {
      const pagesApi = await fetch(`http://localhost:58513/pages/`);
      const pagesData = await pagesApi.json();
  
      if (Object.keys(pagesData).length === 0) {
        throw new Error("No data found");
      }

      pages.addHtml(pagesData.data);
      section.addHtml(pagesData.sections);

      Storage.setData("pages", pagesData.data);
  
    } catch (error) {
      throw new Error(`An error: ${error}`);
    }
}

async function savePage(data = {}, callback) {
    try {
        const resp = await fetch(`http://localhost:58513/pages`, {
            method: 'POST',
            body: data
        })

        const newData = await resp.json();
        pages.addHtml(newData.data);
        section.addHtml(newData.sections);
        Storage.setData("pages", newData.data);
        callback()

        const index = newData.length;

        window.location.href = `/#${ newData[ index - 1 ].uuid }`;
    } catch (error) {
      console.log(error);
        return error
    }
}

async function deletePage(uuid = '') {
    if(uuid === '') {
      alert("Selecciona una pagina");
      return;
    }
  
    try {
      await fetch(`http://localhost:58513/pages/${uuid}`, {
        method: "delete"
      });
  
      document.getElementById(`${uuid}`).remove()
  
    } catch (error) {
      alert(error)
    }
}