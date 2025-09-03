import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);
    cb(null, `${filename}-${timestamp}${extension}`);
  },
});

// Validasi file (hanya jpg & png)
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png image formats are allowed!"));
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000, // max 3MB
  },
  fileFilter: fileFilter,
});

export default upload;
