const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../laf/src/assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.query.newName);
  },
});

const uploads = multer({ storage });

router.get("/", async (req, res, next) => {
  const uploadsDirectory = path.join(
    `../laf/src/assets/images/${req.query.fileName}`
  );

  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      return res.json({ msg: err });
    }

    if (files.length === 0) {
      return res.json({ msg: "No Images Uploaded!" });
    }

    return res.json({ files });
  });
});

router.post("/", uploads.single("image"), async (req, res) => {
  const image = req.file.path;
  res.json({ msg: "image successfully created" });
});

module.exports = router;
