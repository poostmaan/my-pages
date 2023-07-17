
const addPageForm = document.querySelector('#addPageForm');

async function savePage(data = {}, callback) {
    try {
        const resp = await fetch(`http://localhost:58513/pages`, {
            method: 'POST',
            body: data
        })

        const newData = await resp.json();
        addPage(newData.data);
        callback()

        const index = newData.length;

        window.location.href = `/#${ newData[ index - 1 ].uuid }`;
    } catch (error) {
        return error
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    savePage(form, () => {
        $("#addPadeModal").modal("hide")
        addPageForm.reset();
    })
}

addPageForm.addEventListener("submit", handleSubmit);