document.body.addEventListener("click", function (event) {
  if(event.target.classList.contains("displayMediaPlayer")) {
    const videosrc= event.target.getAttribute("data-src");
    document.querySelector("#mediaPlayer").setAttribute("src", videosrc);

    $('#exampleModal').modal('show')
  }
})

getPages();