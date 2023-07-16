
const addPageForm = document.querySelector('#addPageForm');

async function savePage(data = {}) {
    try {
        const resp = await fetch(`http://localhost:58513/page/save`, {
            method: 'POST',
            body: data
        })

        return await resp.json();
    } catch (error) {
        return error
    }
}

function handleSubmit(event) {
    // ! TODO ESTE CODIGO
    event.preventDefault();
    // let obj = {}
    // let data = [...event.target];
    // let file = data[2].files[0];
    // data.forEach(input => obj[input.id] = input.value);

    // obj.imagen = file

    // const form = new FormData();
    // form.append("imagen", obj.imagen)
    // form.append("description", obj.description)
    // form.append("section", obj.section)
    // ! SE TRANSFORMA EN ESTO

    const form = new FormData(event.target);
    console.log( Object.fromEntries(form.entries()))
    savePage(form)

}

addPageForm.addEventListener("submit", handleSubmit);