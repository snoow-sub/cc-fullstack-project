import { useState } from "react";
import React from "react";

export function SelectDate({ selectDate, formData }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function inputDate(start, end) {
    selectDate(true, start, end);
  }
  return (
    <>
      <h1>レッスンを受講したい日付を入力してください！</h1>
      <img
        src={"./images/dico.png"}
        style={{ width: "100px", height: "100px" }}
      />
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        // required
      />
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        // required
      />
      <button type="button" onClick={() => inputDate()}>
        検索
      </button>
    </>
  );
}
