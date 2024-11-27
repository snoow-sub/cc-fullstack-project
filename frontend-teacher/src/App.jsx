import { useEffect, useState, useRef } from "react";
import { Login, TeacherInput } from "./components/TeacherInput";
import { VideoUpload } from "./components/VideoUpload";
import { ShowS3Images } from "./components/ShowS3Images"; //S3画像表示テスト用

import "./css/App.css";

export default function App() {
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);
  const [studentSum, setStudentSum] = useState(null);
  const [showStudentPage, setShowStudentPage] = useState(false);
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [showImagesPage, setShowImagesPage] = useState(false); //S3画像表示テスト用
  const [lessonNumber, setLessonNumber] = useState("");
  const host = process.env.HOST || "98.82.11.196";
  const port = process.env.PORT || 3000;

  async function getPlans(userId) {
    try {
      const response = await fetch(
        `http://${host}:3000/api/user/${userId}/lesson`
      );
      console.log("レスポンス取れるか確認");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`http://${host}:3000/api/user/`);
      console.log("userレスポンス取れるか確認");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // todo 番号に対して受講生人数を返却
  const student = 3;

  function handleLogin(state) {
    setLogin(state);
  }

  function receiveFormData(data) {
    setProfile(data);
  }

  function handleSend() {
    alert(`受講生人数: ${student}\n入力されたレッスン番号: ${lessonNumber}`);
  }

  useEffect(() => {
    async function fetchPlans() {
      const responseData = await getPlans(1);
      // const userData = await getUser();
      setLesson((prevLessons) => [...prevLessons, responseData]);
      console.log("取得したデータ:", responseData);
    }
    fetchPlans();
  }, [profile]);

  if (showStudentPage) {
    return (
      <div className="student-page">
        <h1>受講生確認画面</h1>
        <div>あなたのレッスン番号を教えてください</div>
        <label htmlFor="lessonNumber">レッスン番号</label>
        <br />
        <input
          type="text"
          id="lessonNumber"
          name="lessonNumber"
          placeholder="レッスン番号を入力してください"
          value={lessonNumber}
          onChange={(e) => setLessonNumber(e.target.value)} // 入力を保存
          className="input-text"
        />
        <br />
        <button onClick={handleSend}>送信</button>
        <button onClick={() => setShowStudentPage(false)}>戻る</button>
      </div>
    );
  }

  if (showVideoPage) {
    return <VideoUpload />;
  }

  if (showImagesPage) {
    //S3画像表示テスト用
    return <ShowS3Images />;
  }

  return (
    <>
      {!start ? (
        <div className="start-screen">
          <div>
            <img src="./image/logo.png" alt="logo" width={300} />
            <br />
            <a href="javascript:void(0);" onClick={() => setStart(true)}>
              Tap to Start <br></br>
              <br></br>　 講師用
            </a>
          </div>
          <br />
          <br />
          <br />
          <div className="footer">
            <button className="student-button" onClick={() => setShowStudentPage(true)}>
              受講生確認画面へ
            </button>
            <br></br>
            <br></br>
            <button className="video-button" onClick={() => setShowVideoPage(true)}>
              画像アップロード
            </button>
            <br></br>
            <br></br>
            {/* S3画像表示テスト用 */}
            <button className="video-button" onClick={() => setShowImagesPage(true)}>
              画像表示
            </button>
          </div>
          <br />
          <br />
        </div>
      ) : (
        <TeacherInput profile={profile} handleLogin={handleLogin} sendFormData={receiveFormData} />
      )}
    </>
  );
}
