
const addPageForm = document.querySelector('#addPageForm');
function handleSubmit(event) {
    event.preventDefault();
    let obj = {}
    let data = [...event.target];
    let file = data[2].files[0];
    data.forEach(input => obj[input.id] = input.value);

    obj.imagen = file

    const form = new FormData();
    form.append("imagen", obj.imagen)
    form.append("description", obj.description)
    form.append("section", obj.section)
}

addPageForm.addEventListener("submit", handleSubmit);