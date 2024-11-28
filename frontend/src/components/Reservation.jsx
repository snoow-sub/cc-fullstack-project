import { useEffect, useState } from "react";
import React from "react";

export function Reservation({ lesson, lessonNumber, setClickPopular, setFlick, setInputDate, setP2Swipe }) {
  const [responseMessage, setResponseMessage] = useState("");
  const handleResponse = (response) => {
    if (response === "OK") {
      setResponseMessage("予約できました！");
      console.log(response);
    } else if (response === "NG") {
      setResponseMessage("予約がキャンセルされました");
      setClickPopular(false);
      setFlick(true);
      setInputDate(false);
      setP2Swipe(true);
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
      <h1>予約を確定しますが、よろしいでしょうか？</h1>
      <div>
        {/* <img className="activity-image" src="image/ike.png" alt="生け花" /> */}
        <div>
          {/* <p>講座番号：{lesson[0][0].store_id}</p> */}
          <p>レッスン内容：{lesson[lessonNumber].description}</p>
          <p>日時：{lesson[lessonNumber].date}</p>
          <p>開始予定時刻：{lesson[lessonNumber].start_time}</p>
          <p>終了予定時刻：{lesson[lessonNumber].location}</p>
          <p>場所：{lesson[lessonNumber].location}</p>
        </div>
        <div>
          <center><table>
              <tbody><tr>
              <td>
                <button className="button-deco" onClick={() => handleResponse("OK")}>予約確定</button>
              </td>
              <td>
                <button className="button-deco" onClick={() => handleResponse("NG")}>キャンセル</button>
              </td>
              </tr></tbody>
            </table></center>
        </div>
      </div>
    </>
  );
}
