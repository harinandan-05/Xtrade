import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./route/route";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true               
}));

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/v1", router);

app.listen(3001, () => {
  console.log("express server up");
});
