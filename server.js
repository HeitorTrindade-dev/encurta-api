import express from "express";
import linkRouter from "./src/routes/linkRouter.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", linkRouter);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});