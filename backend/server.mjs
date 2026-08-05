import express from "express";
import { postRouter } from "./routes/index.mjs";
import cors from "cors";

const app = express();
const port = 3000;

//It is called a body parser middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});
app.use("/api/v1", postRouter);
app.listen(port, () => {
  console.log(`server is running... on ${port}`);
});
