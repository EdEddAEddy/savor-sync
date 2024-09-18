import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});