import { useState } from "react";
import React from "react";
import "../css/selectDate.css";
import "../css/multiStepUserInput.css";

export function SelectDate({
  setInputDate,
  setStartDate,
  setEndDate,
  setP2Swipe,
  fetchPlans,
}) {
  const today = new Date();
  const defaultStartDate = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");
  let tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const defaultEndDate = tommorow.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split("/")
  .join("-");
  
  const [inputStartDate, setInputStartDate] = useState(defaultStartDate);
  const [inputEndDate, setInputEndDate] = useState(defaultEndDate);
  const [dateCheck, setDateCheck] = useState(false);

  function setDate() {
    const dateStartDate = new Date(inputStartDate);
    const dateEndDate = new Date(inputEndDate);
    if (dateStartDate <= dateEndDate) {
      setStartDate(inputStartDate);
      setEndDate(inputEndDate);
      setInputDate(true);
      setP2Swipe(true);
      setDateCheck(false);
    } else {
      setDateCheck(true);
    }
  }
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100vh", // ビューポート全体の高さ
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // 縦方向の中央揃え
        alignItems: "center", // 横方向の中央揃え
        // backgroundColor: "#fdf5e6", // 背景色（例: クリーム色）
      }}
    >
      { dateCheck ? (
        <div className="chat-container">
          <p className="chat-content">
            <span className="chat-main">
              終了日は開始日より後の日付にしてね！
            </span>
            <br />
            <span className="chat-secondary">
              正しい日付を入力してね！
            </span>
          </p>
        </div>
      ) : (
        <div className="chat-container">
          <p className="chat-content">
            <span className="chat-main">
              レッスンを受講したい日付を入力してね！
            </span>
            <br />
            <span className="chat-secondary">
              開始日と終了日を入力してね！
            </span>
          </p>
        </div>
      )}
        <form className="set-calendar1">
          開始日：
          <label className="calendar-design">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={inputStartDate}
              onChange={(e) => setInputStartDate(e.target.value)}
              // required
            />
          </label>
          <br />
          終了日：
          <label className="calendar-design">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={inputEndDate}
              onChange={(e) => setInputEndDate(e.target.value)}
              // required
            />
          </label>
        </form>
        <img
          src={"./images/dico.png"}
          alt="キャラクター"
          className="character-image"
        />
        <br />
        {/* 中沢変更 */}
        <button
          onClick={setDate}
          className="button-next"
        >
          次へ
        </button>
    </div>
  );
}
