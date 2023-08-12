class Pages extends Html {

    constructor() {
        super();
        this.parent = document.querySelector("#pages");
    }

    get htmlConstructor() {
        this.constructPageElement;
    }

    htmlConstructor({ 
        createdAt,
        description, 
        id,
        image, 
        rating,
        section, 
        updatedAt, 
        url, 
      }) {
      
      const uglyDefaultImage = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18942b04359%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18942b04359%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
      const localDate = new Date(createdAt).toLocaleString()

      return `
        <div class="page-card col-md-4 animate__animated animate__bounceIn animate__delay-3s 'animate__invisible'" id="${ id }">
            <div class="card mb-4 box-shadow">
            <div class="position-absolute close-btn" style="right: 5px; top: 5px" title="Eliminar">
              <button class="btn btn-danger" style="border-radius: 0; border-radius: 50%" onclick="deletePage('${id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
            <a href="${ url }" target="_blanks" no-referrer="true">
                <img class="card-img-top" data-src="${ image.length == 0 ? uglyDefaultImage : image }" alt="Card image cap" src="${image.length == 0 ? uglyDefaultImage : image}">
            </a>
            <div class="card-body">
                <p class="card-text">${description}</p>
                <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Created: ${localDate}</small>
                <span class="badge badge-primary">${section}</span>
                </div>
            </div>
            </div>
        </div>
        `;
    }

    defaultHtml() {
      return `
        <div class="col-md-12 d-flex justify-content-center align-items-center flex-column text-white">
            <h3>No data was found</h3>
            <span>Start adding some pages here</span>
        </div>`;
    }

}