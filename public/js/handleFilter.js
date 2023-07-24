function filterBySection(section, obj) {
    if(section == '') return;

    document.getElementsByClassName('nav-active')[0]?.classList.remove('nav-active')
    console.log(obj.classList.add("nav-active"))

    const pagesData = Storage.getData("pages");
    const pagesFiltered = pagesData.filter(page => page.section == section );
    pages.addHtml(pagesFiltered);
    
    console.log(section);
}