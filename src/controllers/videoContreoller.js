import routes from "../routes.js";
import Video from "../models/Video";
import Comment from "../models/Comment";

// globals
// async & await 는 세트다 async 를 쓰면 뒤에 반드시 await 가 붙는다
// async 는 Javascript 에게 기다려달라고 요청하는 함수다.
// await 함수는 async 안에서만 쓸 수 있다.
// 모든 video 를 가져올때 까지 기다려 달라. ({}) = 모든 데이터를 가져와 달라.
// await 함수는 async 안에서만 쓸 수 있다.
// 이렇게 하는 이유는 javaScript 는 한번에 여러 일을 하기 때문에 render 를 실행할 것이 뻔하기 때문
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// ESLint
// Linter 틀린 것을 가르쳐 주는 고마운 녀석
// 설치법 npm install eslint -g (globaly 설치)
export const search = async (req, res) => {
  // const searchingBy = req.query.term;
  //  ES6 이전의 방식
  const {
    query: { term: searchingBy },
  } = req;
  /* req 의 query 안에 있는 term 을 
    searchingBy 라는 이름으로 가져 오고 싶습니다.*/

  let videos = [];

  try {
    videos = await Video.find({
      // mongoose 의 regex 기능 (정규식 = regular expressions)
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }

  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// videos
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;

  const newVideo = await Video.create({
    fileUrl: location,
    title: title,
    description: description,
    creator: req.user.id
  });
  // file 을 upload 하고 url 을 반환하는 middleware 가 필요
  // multer 라는 middleware 가 필요하다
  // multer 사용시 해당 form 에 enctype="multer/form-data" 옵션을 넣어줘야한다
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if(video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  console.log(id, title, description);
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id});
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// send() 가 아닌 render 를 사용하면
// views 에 home 이라는 view 파일을 찾아서 출력한다.

// render 함수의 첫번째 인자는 템플릿 ( view 파일 )
// 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.

// Register View API
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment._id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}