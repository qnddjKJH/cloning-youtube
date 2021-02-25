import mongoose from "mongoose";
// dotenv 는 Open source 프로젝트 한다고 가정할 때
// 데이터베이스를 숨길수 있게 해준다.
import dotenv from "dotenv";

dotenv.config();
// .env 파일에 설정해 둔 값을 사용할 수 있게 됨.
// 자세한 사항은 .config 함수에 마우스를 올리고 읽자.
// 읽어보면 process.env. KEY 값으로 .env 파일의 정보를 가져올 수 있다
// 그리고 반드시 .gitignore 에 .env 파일을 적어놓자 안그럼
// 기껏 숨긴 키값들이나 데이터 베이스 정보를 만천하에 공개하는 것
// 헛수고하는 격
// 옵션 중 useNewUrlParser, useUnifiedTopology 는 에러를 잡는 건데...
// 둘 중 하나만 써도 잡히는데 나는 둘다 써야 잡혀서 씀.
mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handlOpen = () => console.log("✔ Connected to DB");
const handlError = () => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handlOpen);
db.on("error", handlError);
