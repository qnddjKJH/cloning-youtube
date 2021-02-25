// build 후 error 가 무조건 난다 그래서 바벨 폴리필을 불러와줌
import "@babel/polyfill";
import dotenv from "dotenv";
import "./db"
import app from "./app";
dotenv.config;

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✔ Listening on : localhost:${PORT}`);

app.listen(PORT, handleListening);