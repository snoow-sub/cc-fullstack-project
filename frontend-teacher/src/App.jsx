import { useEffect, useState, useRef } from "react";
import { Login, TeacherInput } from "./components/TeacherInput";
import { VideoUpload } from "./components/VideoUpload";
import axios from "axios";

import "./css/App.css";

export default function App() {
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);
  const [showStudentPage, setShowStudentPage] = useState(false);
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [lessonNumber, setLessonNumber] = useState("");
  const [lessonStudent, setLessonStudent] = useState([]);

  const port = process.env.PORT || 3000;

  async function insert(userId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}/lesson`
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

  async function getLessonStudent(lesson_id) {
    try {
      console.log(lesson_id);
      const response = await axios.get(
        `http://localhost:3000/api/lesson/${lesson_id}/reservations`
      );
      console.log("予約確認");
      console.log(response.data);
      if (response.status === 200) {
        // 正常なレスポンスの場合
        console.log("レスポンス受信:", response.data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function handleLogin(state) {
    setLogin(state);
  }

  function receiveFormData(data) {
    setProfile(data);
  }

  const fetchLessonStudent = async (lessonNumber) => {
    try {
      const lessonStudentData = await getLessonStudent(lessonNumber);
      console.log(lessonStudentData.participantList);
      setLessonStudent((prevLessons) => [
        ...prevLessons,
        lessonStudentData.participantList,
      ]);
    } catch (error) {
      console.error("Failed to fetch lesson student:", error);
    }
  };

  function handleSend() {
    fetchLessonStudent(lessonNumber);
    console.log(lessonStudent);
    setLessonStudent([]);
  }

  // useEffect(() => {
  //   async function fetchPlans() {
  //     const responseData = await getPlans(1);
  //     setLesson((prevLessons) => [...prevLessons, responseData]);
  //     console.log("取得したデータ:", responseData);
  //   }
  //   fetchPlans();
  // }, [profile]);

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
        {lessonStudent.length > 0 && (
          <div>
            <h2>レッスンの受講生情報</h2>
            <ul>
              {lessonStudent[0].map((student, index) => (
                <li key={index}>
                  <div>
                    参加者{index + 1}: {student.userName}
                  </div>
                </li>
              ))}
            </ul>
            {/* <pre>{JSON.stringify(lessonStudent, null, 2)}</pre>{" "} */}
          </div>
        )}
      </div>
    );
  }

  if (showVideoPage) {
    return <VideoUpload />;
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
            <button
              className="student-button"
              onClick={() => setShowStudentPage(true)}
            >
              受講生確認画面へ
            </button>
            <br></br>
            <br></br>
            <button
              className="video-button"
              onClick={() => setShowVideoPage(true)}
            >
              動画アップロード
            </button>
          </div>
          <br />
          <br />
        </div>
      ) : (
        <TeacherInput
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
        />
      )}
    </>
  );
}
