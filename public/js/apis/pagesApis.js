const pages = new Pages();
const section = new Section();
const PROD_URL="https://my-pages-43zk-dev.fl0.io"

const user = Storage.getData("auth");
const { token } = user;

async function getPages() {
  const user = Storage.getData("auth");
  const { token } = user;
  const headers = new Headers();
  headers.append("x-access-token", token);

  try {
    const pagesApi = await fetch(`${PROD_URL}/pages/`, {
      headers,
    });

    const pagesData = await pagesApi.json();

    if(!pagesData.ok) {
      Html.renderModalError(pagesData.error[0]['msg']);

      setTimeout(() => {
        Storage.setData("auth", "");
        location.href = '/signin.html';
      }, 3000)

      throw new Error( JSON.stringify(pagesData.error[0]['msg']) );
    }

    // mostrarErroresComoAlertasConRetraso

    pages.addHtml(pagesData.data);
    section.addHtml(pagesData.sections);

    Storage.setData("pages", pagesData.data);
  } catch (err) {
    throw new Error(`An error: ${err}`);
  }
}

async function savePage(data = {}, callback, btnSubmitter) {
  const headers = new Headers();
  headers.append("x-access-token", token);

  try {
    const resp = await fetch(`${PROD_URL}/pages`, {
      headers,
      method: "POST",
      body: data,
    });

    const newData = await resp.json();
    // console.log(newData);
    btnSubmitter.removeAttribute('disabled', false)

    if(!newData.ok) {
      mostrarErroresComoAlertasConRetraso(newData.error)
      return;
    }

    pages.addHtml(newData.data);
    section.addHtml(newData.sections);
    Storage.setData("pages", newData.data);
    callback();

    const index = newData.length;

    window.location.href = `/#${newData[index - 1].uuid}`;
  } catch (error) {
    return error;
  }
}

async function deletePage(uuid = "") {
  const headers = new Headers();
  headers.append("x-access-token", token);

  if (uuid === "") {
    alert("Selecciona una pagina");
    return;
  }

  try {
    await fetch(`${PROD_URL}/pages/${uuid}`, {
      headers,
      method: "delete",
    });

    document.getElementById(`${uuid}`).remove();
  } catch (error) {
    alert(error);
  }
}
