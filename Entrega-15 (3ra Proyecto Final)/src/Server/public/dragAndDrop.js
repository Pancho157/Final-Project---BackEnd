const droparea = document.querySelector(".droparea");

droparea.addEventListener("dragover", (e) => {
  e.preventDefault();
  droparea.classList.add("hover");
});

droparea.addEventListener("dragleave", () => {
  droparea.classList.remove("hover");
});

droparea.addEventListener("drop", (e) => {
  e.preventDefault();

  const image = e.dataTransfer.files[0];
  const type = image.type;

  if (type == "image/png" || type == "image/jpg" || type == "image/jpeg") {
    return upload(image);
  } else {
    droparea.setAttribute("class", "droparea invalid");
    droparea.innerText = "Formato incorrecto!";
    return false;
  }
});

const upload = (image) => {
  droparea.setAttribute("class", "droparea valid");
  droparea.placeholder = image.name;
};
