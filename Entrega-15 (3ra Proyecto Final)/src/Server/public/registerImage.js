const input = document.getElementById("image_uploads");
const list = document.getElementById("list");

input.style.opacity = 0;
input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  const curFiles = input.files;

  if (curFiles.length === 0) {
    list.innerHTML = "<p>No files currently selected for upload.</p>";
  } else {
    list.innerHTML = "";

    for (const file of curFiles) {
      if (file.type.match(/image.*/i)) {
        var reader = new FileReader();

        reader.addEventListener("load", (event) => {
          list.innerHTML += `<li>
                    <p>File name: ${file.name}</p>
                    <p>File size: ${returnFileSize(file.size)}</p>
                    <img src="${event.target.result}">
                    </li>`;
        });

        reader.readAsDataURL(file);
      } else {
        var content = `File name (${file.name}): Not a valid file type.`;
        content += " Update your selection.";

        list.innerHTML += `<li><p>${content}</p></li>`;
      }
    }
  }
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}
