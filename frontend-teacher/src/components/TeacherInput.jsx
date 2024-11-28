import { useEffect, useState } from "react";
import React from "react";
import "../css/teacherInput.css";
import axios from "axios";

export function TeacherInput({ handleLogin, sendFormData }) {
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const [lessonId, setLessonId] = useState();
  const [lesson, setLesson] = useState({
    title: "ポーカー体験クラス",
    date: "2024-12-10",
    start_time: "10:00:00",
    end_time: "12:00:00",
    location: "千葉県",
    description: "ポーカーをやってみたい方はぜひ。",
    imagePath: ["/images/lesson21.jpg"],
    movie_id: ["2Ubyv9FbphM"],
    review: null,
    indicator: 85.0,
  });
  const [store, setStore] = useState({
    address: "東京都千代田区丸の内1-1",
    info: "家族経営の小さな本屋。温かい雰囲気が特徴。",
    certification: true,
    name: "丸の内書店",
  });
  // todo5個以上にも対応できるように修正
  const [lessonAnswer, setLessonAnswer] = useState([
    { question_id: 1, answer: 0.5 },
    { question_id: 2, answer: 0.5 },
    { question_id: 3, answer: 0.5 },
    { question_id: 4, answer: 0.5 },
    { question_id: 5, answer: 0.5 },
  ]);

  const port = process.env.REACT_APP_PORT || 3000;
  const host = process.env.REACT_APP_HOST || "98.82.11.196";


  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "OK") {
      setResponseMessage("登録できました！");
    } else if (response === "NG") {
      setResponseMessage("登録がキャンセルされました");
    }
  };

  const handleRangeChange = (questionId, newValue) => {
    setLessonAnswer((prevAnswers) =>
      prevAnswers.map((item) =>
        item.question_id === questionId
          ? { ...item, answer: newValue } // 該当する question_id の値を更新
          : item
      )
    );
  };


  const handleChange = (dataType, key, value, index = null) => {
    if (dataType === "store") {
      setStore((prev) => ({
        ...prev,
        [key]: value, // key に "name" などが正しく渡される
      }));
    } else if (dataType === "lesson") {
      setLesson((prev) => ({
        ...prev,
        [key]: value,
      }));
      console.log(lesson);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防止
    try {
      const combinedData = {
        store: { ...store },
        lesson: { ...lesson },
        lesson_answer: [...lessonAnswer],
      };


      const response = await axios.post(
        `http://${host}:3000/api/lesson`,
        combinedData

      );

      if (response.status === 201) {
        setResponseMessage("登録が完了しました！");
        setLessonId(response.data.id);
        // console.log(response.id);
        console.log("Response:", response.data);
      } else {
        setResponseMessage("登録に失敗しました。もう一度お試しください。");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      setResponseMessage("エラーが発生しました。");
      console.error("Error submitting data:", error);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    // "HH:MM:SS" -> "HH:MM"
    return time.slice(0, 5);
  };

  if (responseMessage) {
    // responseMessageが空でない場合はメッセージのみを表示
    return (
      <div
        style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}
      >
        {responseMessage}
        <br></br>
        lesson idは{lessonId}です。覚えておいてください
      </div>
    );
  }
  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        {page === 1 ? (
          <div>
            <div className="hello-comment">
              <div className="text">
                こんにちは、講師さん！最初にあなたのことを教えてください！
              </div>
              <span className="ornament"></span>
            </div>
            <br />
            <label htmlFor="name">
              <pre>店舗名or講師名</pre>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="店舗名or講師名を入力してください"
              value={store.name}
              onChange={(e) => handleChange("store", "name", e.target.value)}
              className="input-text"
            />
            <br />
            <br />
            <label htmlFor="address">
              <pre>住所</pre>
            </label>
            <input
              type="address"
              id="address"
              name="address"
              placeholder="東京都〇〇区〇〇町〇〇番地"
              onChange={(e) => handleChange("store", "address", e.target.value)}
              value={store.address}
              className="input-text"
            />
            <br />
            <br />
            <label htmlFor="info">
              <pre>店舗情報</pre>
            </label>
            <input
              type="text"
              id="info"
              name="info"
              value={store.info}
              // onChange={handleChange}
              onChange={(e) => handleChange("store", "info", e.target.value)}
              className="input-info"
            />
            <br />
            <br />
            <br />
            <button
              className="button-deco-next"
              type="button"
              onClick={() => setPage(page + 1)}
            >
              次へ
            </button>
          </div>
        ) : page === 2 ? (
          <div>
            <div className="hello-comment">
              <div className="text">
                こんにちは、講師さん！登録したいレッスンを入力してください！
              </div>
              <span className="ornament"></span>
            </div>
            <br />
            <label htmlFor="lesson">
              <pre>レッスン名</pre>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="レッスン名を入力してください"
              value={lesson.title}
              // onChange={handleChange}
              onChange={(e) => handleChange("lesson", "title", e.target.value)}
              className="input-text"
            />
            <br />
            <label htmlFor="description">
              <pre>レッスン内容</pre>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="レッスン内容を入力してください"
              value={lesson.description}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "description", e.target.value)
              }
              className="input-info"
            />
            <br />
            <label htmlFor="location">
              <pre>場所</pre>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={lesson.location}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "location", e.target.value)
              }
              className="input-text"
            />
            <br />
            <br />
            <br></br>
            <button
              className="button-deco-next"
              type="button"
              onClick={() => setPage(page + 1)}
            >
              次へ
            </button>
            <br />
            <button
              className="button-deco"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              戻る
            </button>
          </div>
        ) : page === 3 ? (
          <div>
            <div className="hello-comment">
              <div className="text">
                レッスン開催日時とサイトに載せる画像などを入力してください
              </div>
              <span className="ornament"></span>
            </div>
            <br />
            <label htmlFor="birthday">
              <pre>レッスン日付</pre>
            </label>
            <label className="input-text">
              <input
                type="date"
                id="date"
                name="date"
                placeholder="開催日を教えてください"
                value={lesson.date}
                onChange={(e) => handleChange("lesson", "date", e.target.value)}
                // onChange={handleChange}
                // required
              />
              <br />
            </label>
            <br />
            <label htmlFor="startTime">開始時間~終了時間</label>
            <br />
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={lesson.start_time}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "start_time", e.target.value)
              }
            />
            {/* <label htmlFor="endTime">終了時間</label> */}
            {/* <br /> */}
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={lesson.end_time}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "end_time", e.target.value)
              }
            />
            <br />
            <label htmlFor="location">
              <pre>
                利用したい画像パス(複数個ある場合は「,」区切りでお願いします。)
              </pre>
            </label>
            <input
              type="text"
              id="imagePath"
              name="imagePath"
              value={lesson.imagePath}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "imagePath", e.target.value.split(","))
              }
              className="input-text"
            />
            <br />
            <label htmlFor="location">
              <pre>
                利用したいYoutubeID(複数個ある場合は「,」区切りでお願いします。)
              </pre>
            </label>
            <input
              type="text"
              id="movie_id"
              name="movie_id"
              value={lesson.movie_id}
              // onChange={handleChange}
              onChange={(e) =>
                handleChange("lesson", "movie_id", e.target.value.split(","))
              }
              className="input-text"
            />
            <br />
            <br />
            <br />
            <button
              className="button-deco-next"
              type="button"
              onClick={() => setPage(page + 1)}
            >
              次へ
            </button>
            <br />
            <button
              className="button-deco"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              戻る
            </button>
          </div>
        ) : // 日付、開始時間、終了時間、imagePath[配列で渡す]、moviePath
        page === 4 ? (
          <div>
            <div className="hello-comment">
              <div className="text">
                こんにちは、講師さん！あなたのレッスンの特徴を教えてください。
              </div>
              <span className="ornament"></span>
              <br></br>
            </div>
            <label className="slide-bar" htmlFor="inout">
              <pre>
                　　インドア派
                <input
                  type="range"
                  name="inout"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lessonAnswer[0].answer}
                  onChange={(e) => handleRangeChange(1, Number(e.target.value))}
                />
                　アウトドア派
              </pre>
            </label>
            <label className="slide-bar" htmlFor="scale">
              <pre>
                　少人数
                <input
                  type="range"
                  name="scale"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lessonAnswer[1].answer}
                  onChange={(e) => handleRangeChange(2, Number(e.target.value))}
                />
                　大人数
              </pre>
            </label>
            <label className="slide-bar" htmlFor="distance">
              <pre>
                　近い方が良い
                <input
                  type="range"
                  name="distance"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lessonAnswer[2].answer}
                  onChange={(e) => handleRangeChange(3, Number(e.target.value))}
                />
                　遠くても良い
              </pre>
            </label>
            <label className="slide-bar" htmlFor="silent">
              <pre>
                　　　黙々とやりたい
                <input
                  type="range"
                  name="silent"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lessonAnswer[3].answer}
                  onChange={(e) => handleRangeChange(4, Number(e.target.value))}
                />
                　和気藹々とやりたい
              </pre>
            </label>
            <label className="slide-bar" htmlFor="silent">
              <pre>
                　運動量　小
                <input
                  type="range"
                  name="silent"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lessonAnswer[4].answer}
                  onChange={(e) => handleRangeChange(5, Number(e.target.value))}
                />
                　運動量　大
              </pre>
            </label>
            <br />
            <br />
            <button
              className="button-deco-next"
              type="button"
              onClick={() => setPage(page + 1)}
            >
              次へ
            </button>
            <br />
            <button
              className="button-deco"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              戻る
            </button>
          </div>
        ) : (
          <div>
            <div className="hello-comment">
              <div className="text">
                内容を確認して「確定」をクリックしてください！
              </div>
              <span className="ornament"></span>
            </div>
            <h3>確認内容</h3>
            <p>
              <strong>店舗名・講師名：　</strong> {store.name}
            </p>
            <p>
              <strong>住所：　　　　　　</strong> {store.address}
            </p>
            <p>
              <strong>店舗情報：　　　　</strong> {store.info}
            </p>
            <p>
              <strong>レッスン名：　　　</strong> {lesson.title}
            </p>
            <p>
              <strong>レッスン内容：　　</strong> {lesson.description}
            </p>
            <p>
              <strong>場所：　　　　　　</strong> {lesson.location}
            </p>
            <p>
              <strong>レッスン日付：　　</strong> {lesson.date}
            </p>
            <p>
              <strong>開始〜終了日時：　</strong> {lesson.start_time}~
              {lesson.end_time}
            </p>
            {/* <p>利用したい画像パス: {lesson.imagePath}</p> */}
            <p>
              <strong>画像パス：　　　　</strong> {lesson.imagePath.join(", ")}{" "}
            </p>

            <p>
              <strong>YoutubeID:　　　</strong> {lesson.movie_id.join(", ")}
            </p>
            <button
              className="button-deco-next"
              type="submit"
              // onClick={() => handleResponse("OK")}
              onClick={(e) => handleSubmit(e)}
            >
              確定
            </button>
            <br />
            <button
              className="button-deco"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              戻る
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
