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
        let htmlToAdded = '';

        if(data.length === 0) {
            htmlToAdded = this.defaultHtml();
        } else {
            data.forEach((dataValue) => {
                htmlToAdded += this.htmlConstructor(dataValue);
            });
        }
        
        this.renderPageBox(htmlToAdded);

    }

    static renderModalError(msg) {
        const modal = document.querySelector("#errorModal > div > div");
        const modalError = `
            <div class="p-4" style="border-top: 5px solid red">
                <i class="fa-solid fa-triangle-exclamation" style="color: red"></i> <b>${ msg }</b>, you will return to login page
                <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="gifs" width="25" height="25"/>
            </div>
        `;
        modal.innerHTML = modalError;
        $("#errorModal").modal('show')
    }

}