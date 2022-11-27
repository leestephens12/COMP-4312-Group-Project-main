var express = require('express');
var router = express.Router();
var expressFile = require('express-fileupload');
const path = require("path");
const app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor');
});

function imageHandler(req, res, appliedFilter) {
  if (!req.files) { // no files uploaded
    res.redirect('../editor');
  }
  else { // files uploaded
    var image = req.files.fileUpload;
    var acceptedMimeTypes = ['image/apng', 'image/bmp', 'image/gif', 'image/x-icon', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    let usedFilter = "";

    if (acceptedMimeTypes.includes(image.mimetype)) { // check if the file is an image
      switch (appliedFilter) {
        case "filter1":
          usedFilter = "blur";
          break;
      
        case "filter2":
          usedFilter = "hue-rotate";
          break;

        case "filter3":
        usedFilter = "drop-shadow";
        break;

        case "filter4":
        usedFilter = "greyscale";
        break;

        case "filter5":
        usedFilter = "sepia";
        break;

        case "filter6":
        usedFilter = "invert";
        break;  
        
        default:
          usedFilter = "hue-rotate";
          break;
      }

      image.name = Date.now().toString() + '_' + image.name; // uniquely rename file to current date + prev. image name
      image.mv(path.join(__dirname, '../public/images/uploaded', image.name), (err) => { // move image to uploads
				if (err) { // if it isn't moved, render error page
					res.render('error', { message: 'There was an error!', error: err });
				}
				else { // if successfully moved, redirect to results page
          res.render('results', { url: image.name, filter: usedFilter });
				}
			});
    }
    else { // redirect back to editor if file type is not an image
      res.redirect('../editor');
    }
  }
}

router.post('/filter1', function(req, res, next) {
  imageHandler(req, res, "filter1");
});

router.post('/filter2', function(req, res, next) {
  imageHandler(req, res, "filter2");
});

router.post('/filter3', function(req, res, next) {
  imageHandler(req, res, "filter3");
});

router.post('/filter4', function(req, res, next) {
  imageHandler(req, res, "filter4");
});

router.post('/filter5', function(req, res, next) {
  imageHandler(req, res, "filter5");
});

router.post('/filter6', function(req, res, next) {
  imageHandler(req, res, "filter6");
});

module.exports = router;