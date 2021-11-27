const msg = () => {
    if(err) {
        res.render('./layouts/main.handlebars', {
            msg: err
        });
    } else {
        if(req.file === undefined){
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
};

const upload = () => {
    if(err) {
        res.render('./layouts/main.handlebars', {
            msg: err
        });
    } else {
        if(req.file === undefined){
            res.render('./layouts/main.handlebars', {
                msg: 'Error: No File Selected!'
            });
        } else {
            console.log(req.file);
            res.render('./layouts/main.handlebars', {
                msg: 'File Uploaded!',
                file: `uploads/${req.file.filename}`
            });
            const image = `uploads/${req.file.filename}`
                return image;
        }
        
    }
};

module.exports = msg, upload;