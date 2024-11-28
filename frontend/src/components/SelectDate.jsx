import { useState } from "react";
import React from "react";
import "../css/selectDate.css";

export function SelectDate({ setInputDate, setStartDate, setEndDate, setP2Swipe }) {
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

  function setDate() {
    const dateStartDate = new Date(inputStartDate);
    const dateEndDate = new Date(inputEndDate);
    if (dateStartDate <= dateEndDate) {
      setStartDate(inputStartDate);
      setEndDate(inputEndDate);
      setInputDate(true);
      setP2Swipe(true);
    } else {
      alert('終了日は開始日より後にしてね！');
    }
  }
  return (
    <>
      <div
          style={{
            position: "absolute",
            top: "12%",
            left: "0%",
            width: "100%",
            maxWidth: "500px",
            minWidth: "200px",
            minHeight: "100px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
        <p style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "0 auto", // 中央揃え
              width: "100%", // 親幅に合わせる
              wordWrap: "break-word", // 長い単語を折り返し
              whiteSpace: "normal", // 折り返し有効化
              overflow: "hidden", // オーバーフロー防止
              //textOverflow: "ellipsis", // 長すぎる場合に省略
              //backgroundColor: "blue",
            }}
        >レッスンを受講したい日付を入力してください！</p>
        <p style={{
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
            margin: "10px auto 0", // 上に余白を追加
            width: "100%", // 親幅に合わせる
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >開始日と終了日を入力してね！</p>
      </div>
      <center>
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
          style={{
            width: "180px",
            height: "180px",
            marginBottom: "20px",
            position: "absolute",
            left: "30%",
            top: "25%",
          }}
        />
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
