const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');

// set storage engine
// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// check File Type
function checkFileType(file, cb){
    //allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

//init app
const app = express();

const hbs = exphbs.create({ helpers });

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// public folder
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res. render('./layouts/main.handlebars'));

app.post('/upload', (req, res) => {  
    upload(req, res, (err) => {
        if(err) {
            res.render('./layouts/main.handlebars', {
                msg: err
            });
        }else {
            if(req.file == undefined){
                res.render('./layouts/main.handlebars', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('./layouts/main.handlebars', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));