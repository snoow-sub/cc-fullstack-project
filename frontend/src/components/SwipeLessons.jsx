import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";

export function SwipeLessons({
  profile,
  setFlick,
  reserveLesson,
  handleSwipeType,
  lesson,
  popularLesson,
}) {
  const currentPath = process.env.REACT_APP_BASE_DIR || "../../";
  const [number, setNumber] = useState(0);
  const limit = 5;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      if (number < limit) {
        reserveLesson(number + 1);
        setNumber(number + 1);
      }
      console.log("呼ばれてますよ左");
      setTimeout(() => {
        handleSwipeType("なし");
      }, 10);
    },
    onSwipedRight: () => {
      handleSwipeType("right");
      reserveLesson(number);
      setFlick(false);
      console.log("呼ばれてますよ右");
      console.log(lesson[number]);
      // setTimeout(() => {
      //   setFlick(true); // 元に戻す
      //   handleSwipeType("なし");
      // }, 1000);
    },
  });

  function clickPopularLesson(popularNumber) {
    setNumber(popularNumber);
    reserveLesson(popularNumber);
    setFlick(false);
  }

  return (
    <>
      {number < limit ? (
        <div>
          <div className="profile-info">
            <center>
              <form className="set-calendar">
                <label className="calendar-design">
                  <input type="date" />
                </label>
              </form>
            </center>
            <br />
          </div>
          <br />
          <div className="lesson-box" {...handlers}>
            <img
              className="lesson-image"
              src={lesson[number].imagePath}
              alt="生け花"
              {...handlers}
            />
            <div className="lesson-details">
              {/* <p>{profile.calendar}</p> */}
              <p>レッスン内容：{lesson[number].description}</p>
              <p>日時：{lesson[number].date}</p>
              <p>開始予定時刻：{lesson[number].start_time}</p>
              <p>終了予定時刻：{lesson[number].location}</p>
              <p>場所：{lesson[number].location}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <center>
              <h1>人気Top3のレッスンから選んでね！</h1>
            </center>
          </div>
          <div className="lesson-box">
            <div
              className="lesson-details"
              onClick={() => clickPopularLesson(0)}
            >
              <p>レッスン内容：{popularLesson[0].description}</p>
              <p>日時：{popularLesson[0].date}</p>
              <p>開始予定時刻：{popularLesson[0].start_time}</p>
              <p>終了予定時刻：{popularLesson[0].location}</p>
              <p>場所：{popularLesson[0].location}</p>
            </div>
          </div>
          <br />
          <div className="lesson-box">
            <div
              className="lesson-details"
              onClick={() => clickPopularLesson(1)}
            >
              <p>レッスン内容：{popularLesson[1].description}</p>
              <p>日時：{popularLesson[1].date}</p>
              <p>開始予定時刻：{popularLesson[1].start_time}</p>
              <p>終了予定時刻：{popularLesson[1].location}</p>
              <p>場所：{popularLesson[1].location}</p>
            </div>
          </div>
          <br />
          <div className="lesson-box">
            <div
              className="lesson-details"
              onClick={() => clickPopularLesson(2)}
            >
              <p>レッスン内容：{popularLesson[2].description}</p>
              <p>日時：{popularLesson[2].date}</p>
              <p>開始予定時刻：{popularLesson[2].start_time}</p>
              <p>終了予定時刻：{popularLesson[2].location}</p>
              <p>場所：{popularLesson[2].location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
