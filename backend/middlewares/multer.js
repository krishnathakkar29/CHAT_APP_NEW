import multer from "multer";

export const multerUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
