const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = (file, filename) => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file,
        fileName: filename, // The name of the file being uploaded
        useUniqueFileName: true, // Ensures the file name is unique
        folder: "ai-social", // The folder where the file will be stored
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = uploadFile; // Exporting the uploadFile function for use in other modules
// This function can be used to upload files to ImageKit from other parts of the application.
