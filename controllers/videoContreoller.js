// globals
export const home = (req, res) => res.render("home");
export const search = (req, res) => res.send("search");

// videos
export const videos = (req, res) => res.send("videos");
export const upload = (req, res) => res.send("upload");
export const videoDetail = (req, res) => res.send("videoDetail");
export const editVideo = (req, res) => res.send("editVideo");
export const deleteVideo = (req, res) => res.send("deleteVideo");


// send() 가 아닌 render 를 사용하면 
// views 에 home 이라는 view 파일을 찾아서 출력한다.