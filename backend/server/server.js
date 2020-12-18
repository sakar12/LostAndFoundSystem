var express = require("express");
var app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
const apiRouter = require("./routes");
const imageRouter = require("./imageroutes");
const getImageRouter = require("./getImage");
const messageRouter = require("./messsageRoutes");

app.use("/api/laf", apiRouter);
app.use("/api/images", imageRouter);
app.use("/api/messages", messageRouter);
app.use("./api/getImage", getImageRouter);

app.listen(process.env.PORT || "3000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3000"}`);
});
