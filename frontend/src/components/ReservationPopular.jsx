import { useEffect, useState } from "react";
import React from "react";

export function ReservationPopular({ popularLesson, lessonNumber }) {
  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "OK") {
      setResponseMessage("予約できました！");
      console.log(response);
    } else {
      setResponseMessage("予約エラー");
    }
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
    <>
      <h1>以下のレッスンを予約しました！</h1>
      <div>
        {/* <img className="activity-image" src="image/ike.png" alt="生け花" /> */}
        <div>
          {/* <p>講座番号：{lesson[0][0].store_id}</p> */}
          <p>レッスン内容：{popularLesson[lessonNumber].description}</p>
          <p>日時：{popularLesson[lessonNumber].date}</p>
          <p>開始予定時刻：{popularLesson[lessonNumber].start_time}</p>
          <p>終了予定時刻：{popularLesson[lessonNumber].location}</p>
          <p>場所：{popularLesson[lessonNumber].location}</p>
        </div>
        <div>
          <center>
            <button className="button-deco" onClick={() => handleResponse("OK")}>閉じる</button>
          </center>
        </div>
      </div>
    </>
  );
}
