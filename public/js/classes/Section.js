class Section extends Html {
    constructor() {
        super()
        this.parent = document.querySelector("#navbar");
    }

    get htmlConstructor() {
        this.constructPageElement;
    }

    htmlConstructor({section, count}) {
        return `
            <li onclick="filterBySection('${section}', this)" class="nav-element d-flex justify-content-between pointer nav-link mt-1">
              <div>
              ${section}
              </div>
              <div class="bg-white w-25 rounded text-dark text-center">${count}</div>
            </li>
        `;
    }

    defaultHtml() {
        return ``
    }
}