const fs = require("fs");
const path = require("path");

function deleteUserPhoto(photo) {
  fs.unlinkSync(path.join(__dirname, `../../Server/public/images/${photo}`));
}

module.exports = { deleteUserPhoto };
