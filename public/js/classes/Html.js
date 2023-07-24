class Html {

    constructor() {
        this.parent = '';
    }

    get renderPageBox() {
        this.renderPageBox;
    }

    renderPageBox(dataHtml) {
        let range = document.createRange();
        let fragment = range.createContextualFragment(dataHtml);
        this.parent.appendChild(fragment);
    }

    get addHtml() {
        this.addHtml;
    }
      
    addHtml(data) {
        this.parent.innerHTML='';
        data.forEach((dataValue) => {
            const dataHtml = this.htmlConstructor(dataValue);
            this.renderPageBox(dataHtml);
        });
    }

}