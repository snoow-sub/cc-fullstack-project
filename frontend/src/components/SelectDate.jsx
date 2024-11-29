import { useState } from "react";
import React from "react";
import "../css/selectDate.css";

export function SelectDate({
  handleInputStartDate,
  handleInputEndDate,
  handleInputDate,
}) {
  const [inputStartDate, setInputStartDate] = useState("2024-11-29");
  const [inputEndDate, setInputEndDate] = useState("2024-12-01");

  function setDate() {
    console.log("開始日:", inputStartDate, "終了日:", inputEndDate); // デバッグ用
    handleInputStartDate(inputStartDate);
    handleInputEndDate(inputEndDate);
    handleInputDate(true);
  }
  return (
    <div className="selectDateMain">
      <div className="chat-container">
        <p className="chat-main">
          レッスンを受講したい日付を入力してください！
        </p>
        <p className="chat-secondary">開始日と終了日を入力してね！</p>
      </div>

      <form className="set-calendar1">
        開始日：
        <label className="calendar-design">
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={inputStartDate}
            onChange={(e) => setInputStartDate(e.target.value)}
            className="input date-style"
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
            className="input date-style"
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
      <button onClick={setDate} className="button-next">
        次へ
      </button>
    </div>
  );
}
