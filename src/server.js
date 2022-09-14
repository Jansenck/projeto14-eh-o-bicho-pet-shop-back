import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from  "./routes/auth.router.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(signUpRouter);


app.get("/teste", (req, res) => {
  return res.send(
    "Hello World!"
  );
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
