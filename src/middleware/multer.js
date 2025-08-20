import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().getTime();
    const filename = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);

    cb(null, `${filename}-${timestamp}${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
});

export default upload;
