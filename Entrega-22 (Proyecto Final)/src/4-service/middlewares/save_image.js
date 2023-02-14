const multer = require("multer");
const path = require("path");

// Sets storage folder and file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(error, storage)
    cb(null, path.join(__dirname, "../../1-server/public/images"));
  },
  filename: (req, file, cb) => {
    // Saves the file with MongoDB id and file extension
    cb(
      null,
      req.productData._id.toString() + file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.single("image_uploads");
