import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();  
app.use(express.json({ limit: "20kb" }));   // for json parsing

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);  // for cors security only verified frontend call to this backend

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  }),
);    


app.use(cookieParser());  // req  cookies from body + url
app.use(express.static("public"));

export {app};
