import multer from "multer"

/* Multer config */
export function multer_function(){
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        //cb(null, `${Date.now()}-${file.originalname}`)
        cb(null, `${file.originalname}`)
      }
    })

    const upload = multer({ storage: storage })
    const middlewareDeImagenes = upload.single('miArchivo')
    return middlewareDeImagenes

}




