
const addPageForm = document.querySelector('#addPageForm');

function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    savePage(form, () => {
        $("#addPadeModal").modal("hide")
        addPageForm.reset();
    })
}

addPageForm.addEventListener("submit", handleSubmit);