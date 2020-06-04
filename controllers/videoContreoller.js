import  {videos} from "../db.js"

// globals
export const home = (req, res) => {

    res.render("home", {pageTitle: "Home", videos});
};

export const search = (req, res) => {
    // const searchingBy = req.query.term;
    //  ES6 이전의 방식

    const {
        query: {term: searchingBy}
    } = req;
    /* req 의 query 안에 있는 term 을 
    searchingBy 라는 이름으로 가져 오고 싶습니다.*/

    res.render("search", {pageTitle: "Search", searchingBy})
};

// videos
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "VideoDetail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "EditVideo"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "DeleteVideo"});


// send() 가 아닌 render 를 사용하면 
// views 에 home 이라는 view 파일을 찾아서 출력한다.

// render 함수의 첫번째 인자는 템플릿 ( view 파일 )
// 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.