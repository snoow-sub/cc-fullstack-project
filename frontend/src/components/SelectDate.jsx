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
        <img
          src={"./images/dico.png"}
          style={{ width: "100px", height: "100px" }}
        />
        <br />
        <button onClick={setDate} className="">
          検索
        </button>
      </center>
    </>
  );
}
