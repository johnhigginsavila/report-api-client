const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


const CONFIG = require('./config');

cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY.CLOUD_NAME, 
  api_key: CONFIG.CLOUDINARY.API_KEY, 
  api_secret: CONFIG.CLOUDINARY.API_SECRET
});

function storage (folderName, allowedFormats = ['jpg', 'png']) {
  return cloudinaryStorage({
    cloudinary: cloudinary,
    folder: folderName,
    allowedFormats: allowedFormats,
    filename: function (req, file, cb) {
      const filename = file.originalname +'_'+ new Date();
      cb(undefined, filename);
    }
  });
}

function singleUpload (fieldName, folderName = 'public', allowedFormats = ['jpg', 'png']) {
  const upload = multer({ storage: storage(folderName, allowedFormats) });
  return upload.single(fieldName);
}

function multipleUpload (fieldName, numberOfFiles, folderName = 'public', allowedFormats = ['jpg', 'png'] ) {
  const upload = multer({ storage: storage(folderName, allowedFormats) });
  return upload.array(fieldName, numberOfFiles);
}

module.exports = {
  singleUpload: singleUpload,
  multipleUpload: multipleUpload
};
