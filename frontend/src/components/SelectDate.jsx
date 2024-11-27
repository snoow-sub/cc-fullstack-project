import { useState } from "react";
import React from "react";

export function SelectDate({ selectDate, formData }) {
  function FormValue() {
    const [startDate, setStartDate] = useState(new Date("2024-11-29"));
    const [endDate, setEndDate] = useState(new Date("2024-12-01"));

    const handleInputStartDateChange = (event) => {
      // 入力値を更新する
      setStartDate(event.target.value);
    };

    const handleInputEndDateChange = (event) => {
      // 入力値を更新する
      setEndDate(event.target.value);
    };
  }
  return (
    <>
      <h1>レッスンを受講したい日付を入力してください！</h1>
      <img
        src={"./images/dico.png"}
        style={{ width: "100px", height: "100px" }}
      />
      <form onSubmit={selectDate}>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          // required
        />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          // required
        />
        <button type="submit">検索</button>
      </form>
    </>
  );
}
