const pagesBox = document.querySelector("#pages");
const uglyDefaultImage = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18942b04359%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18942b04359%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

function construcMessageHtml({ 
    created, 
    description, 
    imagen, 
    section, 
    url, 
}) {
  return `
    <div class="col-md-4">
        <div class="card mb-4 box-shadow">
        <a href="${ url }" target="_blanks" no-referrer="true">
            <img class="card-img-top" data-src="${ imagen.length == 0 ? uglyDefaultImage : imagen }" alt="Card image cap" src="${imagen.length == 0 ? uglyDefaultImage : imagen}">
        </a>
        <div class="card-body">
            <p class="card-text">${description}</p>
            <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Created: ${created}</small>
            <span class="badge badge-primary">${section}</span>
            </div>
        </div>
        </div>
    </div>
    `;
}

function renderPageBox(pageHtml) {
  let range = document.createRange();
  let fragment = range.createContextualFragment(pageHtml);
  pagesBox.appendChild(fragment);
}

function addPage(page = {}) {
  const pageHtml = construcMessageHtml(page);
  renderPageBox(pageHtml);
}

(async () => {
  try {
    const pagesApi = await fetch(`http://localhost:58513/pages/`);
    const pagesData = await pagesApi.json();

    if (Object.keys(pagesData).length === 0) {
      throw new Error("No data found");
    }

    pagesData.forEach((page) => addPage(page));
  } catch (error) {
    throw new Error(`An error: ${error}`);
  }
})();