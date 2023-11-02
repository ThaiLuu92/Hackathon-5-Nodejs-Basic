import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { route } from "./routes/index.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

route(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connecting to http://localhost:${PORT}`);
});
