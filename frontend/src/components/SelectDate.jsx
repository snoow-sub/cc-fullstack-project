import { useState } from "react";
import React from "react";
import "../css/selectDate.css";

export function SelectDate({ handleInputStartDate, handleInputEndDate, handleInputDate }) {
  const [inputStartDate, setInputStartDate] = useState("2024-11-29");
  const [inputEndDate, setInputEndDate] = useState("2024-12-01");

  function setDate() {
    console.log("開始日:", inputStartDate, "終了日:", inputEndDate); // デバッグ用
    handleInputStartDate(inputStartDate);
    handleInputEndDate(inputEndDate);
    handleInputDate(true);
  }
  return (
    <>
      <h2>レッスンを受講したい日付を入力してください！</h2>
      <center>
        <form className="set-calendar">
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
          <br />
        </form>
        <img src={"./images/dico.png"} style={{ width: "100px", height: "100px" }} />
        <br />
        {/* 中沢変更 */}
        <button
          onClick={setDate}
          style={{
            position: "absolute",
            bottom: "8%",
            left: "5%",
            width: "90%",
            padding: "10px",
            backgroundColor: "#f39867",
            color: "white",
            border: "none",
            borderradius: "5px",
            fontsize: "16px",
            cursor: "pointer",
          }}
        >
          次へ
        </button>
      </center>
    </>
  );
}
