import multer from 'multer'

const sotrage = multer.memoryStorage();
const validImageType = ['image/png', 'image/jpg', 'image/jpeg']
export const upload = multer({
  storage: sotrage,
  limits: { fileSize: ((1.7) * (1024) * (1024)) },
  // error:{}
  fileFilter(req, file, cb) {
    if (validImageType.includes(file.mimetype)) {
      cb(null, true)
    } else {

      const error = new Error("image not valid - accept only [png, jpg, jpeg]");
      error['statusCode'] = 400
      cb(error)
    }
  },
});

// export default upload;