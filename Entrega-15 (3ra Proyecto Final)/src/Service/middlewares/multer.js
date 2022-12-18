const multer = require("multer");
const path = require("path");

// Sets storage folder and file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(error, storage)
    cb(null, path.join(__dirname, "../../Server/public/images"));
  },
  filename: (req, file, cb) => {
    // Saves the file name with the date of upload (for error handling)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.single("image_uploads");
