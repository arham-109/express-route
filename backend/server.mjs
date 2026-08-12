import express from "express";
import { postRouter } from "./routes/index.mjs";
import cors from "cors";

const app = express();
const port = process.env.port || 3000;

//It is called a body parser middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});
app.use("/api/v1", postRouter);
app.listen(port, () => {
  console.log(`server is running... on ${port}`);
});
