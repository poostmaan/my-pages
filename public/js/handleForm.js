
const addPageForm = document.querySelector('#addPageForm');

function handleSubmit(event) {
    event.preventDefault();
    event.submitter.setAttribute('disabled', true)
    const form = new FormData(event.target);
    savePage(form, () => {
        $("#addPadeModal").modal("hide")
        addPageForm.reset();
    }, event.submitter)
}

addPageForm.addEventListener("submit", handleSubmit);