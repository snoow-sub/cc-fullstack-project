import { useEffect, useState } from "react";
import React from "react";
import "../css/teacherInput.css";

export function TeacherInput({ handleLogin, sendFormData }) {
  const [formData, setFormData] = useState({
    id: 13,
    name: "test2",
    birthday: "1992-02-20",
    info: "この店はすごい健全なお店です。",
    address: "test",
    location: "test",
  });

  const [answer, setAnswer] = useState({
    user_id: null,
    user_answer: [
      { question_id: 1, answer: 0.5 },
      { question_id: 2, answer: 0.5 },
      { question_id: 3, answer: 0.5 },
      { question_id: 4, answer: 0.5 },
    ],
  });
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "98.82.11.196";

  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "はい") {
      setResponseMessage("登録できました！");
      console.log(response);
    } else if (response === "だめ") {
      setResponseMessage("予約がキャンセルされました");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://${host}:3000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("登録成功:", responseData.id);

      const updatedAnswer = {
        ...answer,
        user_id: responseData.id,
      };

      setAnswer(updatedAnswer);

      const responseAnswer = await fetch(
        `http://${host}:3000/api/user_answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAnswer),
        }
      );
      if (!responseAnswer.ok) {
        throw new Error(`HTTP error! Status: ${responseAnswer.status}`);
      }
      console.log("回答登録成功:", await responseAnswer.json());

      sendFormData(formData);
      handleLogin(true); // ログイン状態にする
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setErrorMessage("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRangeChange = (questionId, value) => {
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      user_answer: prevAnswer.user_answer.map((item) =>
        item.question_id === questionId ? { ...item, answer: value } : item
      ),
    }));
  };

  if (responseMessage) {
    // responseMessageが空でない場合はメッセージのみを表示
    return (
      <div
        style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}
      >
        {responseMessage}
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
              <pre>名前</pre>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="お名前を入力してください"
              value={formData.name}
              onChange={handleChange}
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
              onChange={handleChange}
              value={formData.address}
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
              value={formData.info}
              onChange={handleChange}
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
              value={formData.title}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.location}
              onChange={handleChange}
              className="input-text"
            />
            <br />
            <label htmlFor="birthday">
              <pre>レッスン日付</pre>
            </label>
            <label className="input-text">
              <input
                type="date"
                id="brithday"
                name="birthday"
                placeholder="生年月日を入力してください"
                value={formData.birthday}
                onChange={handleChange}
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
              value="00:00"
              onChange={handleChange}
            />
            {/* <label htmlFor="endTime">終了時間</label> */}
            {/* <br /> */}
            <input
              type="time"
              id="endTime"
              name="endTime"
              value="23:00"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="location">
              <pre>利用したい画像アップロード</pre>
            </label>
            <input
              type="text"
              id="imagePath"
              name="imagePath"
              value={formData.location}
              onChange={handleChange}
              className="input-text"
            />
            <br />
            <label htmlFor="location">
              <pre>Youtube URL</pre>
            </label>
            <input
              type="text"
              id="moviePath"
              name="moviePath"
              value={formData.location}
              onChange={handleChange}
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

        page === 3 ? (
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
                  value={answer.user_answer[0].answer}
                  onChange={(e) => handleRangeChange(1, Number(e.target.value))}
                />
                　アウトドア派
              </pre>
            </label>
            <br />
            <label className="slide-bar" htmlFor="scale">
              <pre>
                　少人数
                <input
                  type="range"
                  name="scale"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[1].answer}
                  onChange={(e) => handleRangeChange(2, Number(e.target.value))}
                />
                　大人数
              </pre>
            </label>
            <br />
            <label className="slide-bar" htmlFor="distance">
              <pre>
                　近い方が良い
                <input
                  type="range"
                  name="distance"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[2].answer}
                  onChange={(e) => handleRangeChange(3, Number(e.target.value))}
                />
                　遠くても良い
              </pre>
            </label>
            <br />
            <label className="slide-bar" htmlFor="silent">
              <pre>
                　　　黙々とやりたい
                <input
                  type="range"
                  name="silent"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[3].answer}
                  onChange={(e) => handleRangeChange(4, Number(e.target.value))}
                />
                　和気藹々とやりたい
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
            <br />
            <h3>確認内容</h3>
            <p>名前: {formData.name}</p>
            <p>住所: {formData.address}</p>
            <p>店舗情報: {formData.info}</p>
            <p>レッスン名: {formData.lesson}</p>
            <p>レッスン内容: {formData.description}</p>
            <p>場所: {formData.location}</p>
            <br />
            <button
              className="button-deco-next"
              type="submit"
              onClick={() => handleResponse("はい")}
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
