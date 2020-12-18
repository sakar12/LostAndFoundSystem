const express = require("express");
const router = express();

router.get("/file", function (req, res) {
  const filePath = `../laf/src/assets/images/${req.query.fileName}`;
  res.sendFile(filepath);
});

module.exports = router;
