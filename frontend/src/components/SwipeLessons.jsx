import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";
import { ImageGallery } from "./ImageGallery";

export function SwipeLessons({
  profile,
  setFlick,
  setClickPopular,
  reserveLesson,
  handleSwipeType,
  lesson,
  popularLesson,
  startDate,
  endDate,
}) {
  const currentPath = process.env.REACT_APP_BASE_DIR || "../../";
  const [number, setNumber] = useState(0);
  const limit = 5;
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      if (card1Ref.current) {
        card1Ref.current.style.animation = "cardrotate 5s ease-in-out forwards";
      }
      if (card2Ref.current) {
        card2Ref.current.style.animation = "cardrotate 5s ease-in-out forwards";
      }
      if (card3Ref.current) {
        card3Ref.current.style.animation = "cardrotate 5s ease-in-out forwards";
      }
    };

    const handleAnimationEnd = (event) => {
      const cardElement = event.currentTarget; // どのカードがアニメーションを終えたかを取得
      cardElement.style.animation = "none"; // アニメーションを無効化
      cardElement.style.transform = "rotateY(0deg)"; // 表面を向かせる
    };

    // アニメーションを開始
    startAnimation();

    // 各カードにイベントリスナーを追加
    if (card1Ref.current) {
      card1Ref.current.addEventListener("animationend", handleAnimationEnd);
    }
    if (card2Ref.current) {
      card2Ref.current.addEventListener("animationend", handleAnimationEnd);
    }
    if (card3Ref.current) {
      card3Ref.current.addEventListener("animationend", handleAnimationEnd);
    }

    // クリーンアップ
    return () => {
      if (card1Ref.current) {
        card1Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
      if (card2Ref.current) {
        card2Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
      if (card3Ref.current) {
        card3Ref.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      }
    };
  }, []);

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
    // onSwipedUp: () => {
    //   handleSwipeType("up");
    //   console.log("上スワイプされました");
    //   setTimeout(() => {
    //     handleSwipeType("なし");
    //   }, 10);
    // },
    // onSwipedDown: () => {
    //   handleSwipeType("down");
    //   console.log("下スワイプされました");
    //   setTimeout(() => {
    //     handleSwipeType("なし");
    //   }, 10);
    // },
    // preventDefaultTouchmoveEvent: true, // スクロールと競合しないよう設定
    // trackTouch: true,
  });

  function clickPopularLesson(popularNumber) {
    setNumber(popularNumber);
    reserveLesson(popularNumber);
    setClickPopular(true);
    setFlick(false);
  }

  return (
    <>
      {number < limit ? (
        <div>
          <div className="profile-info">
            <center>
              <form className="set-calendar">
                開始日：
                <label className="calendar-design">
                  <input type="date" value={startDate} />
                </label>
                <br />
                終了日：
                <label className="calendar-design">
                  <input type="date" value={endDate} />
                </label>
              </form>
            </center>
            <br />
          </div>
          <br />
          <div className="lesson-box" {...handlers}>
            {/*{" "}
            <img
              className="lesson-image"
              src={lesson[number].imagePath}
              alt="生け花"
              {...handlers}
            />{" "}
            */}
            <ImageGallery
              imgPathList={["./images/logo.png", "./images/tennis.png"]}
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
        <div id="container">
          <div>
            <h1>人気Top3のレッスンから選んでね</h1>
          </div>
          <div id="card" ref={card1Ref} onClick={() => clickPopularLesson(0)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その1</p>
            </figure>
            <figure className="back">
              <h2>ID: {popularLesson[0].id}</h2>
              <p>レッスン内容：{popularLesson[0].description}</p>
              <p>日時：{popularLesson[0].date}</p>
              <p>開始予定時刻：{popularLesson[0].start_time}</p>
              <p>終了予定時刻：{popularLesson[0].location}</p>
              <p>場所：{popularLesson[0].location}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card2Ref} onClick={() => clickPopularLesson(1)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その2</p>
            </figure>
            <figure className="back">
              <h2>ID: {popularLesson[0].id}</h2>
              <p>レッスン内容：{popularLesson[1].description}</p>
              <p>日時：{popularLesson[1].date}</p>
              <p>開始予定時刻：{popularLesson[1].start_time}</p>
              <p>終了予定時刻：{popularLesson[1].location}</p>
              <p>場所：{popularLesson[1].location}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card3Ref} onClick={() => clickPopularLesson(2)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その3</p>
            </figure>
            <figure className="back">
              <h2>ID: {popularLesson[0].id}</h2>
              <p>レッスン内容：{popularLesson[2].description}</p>
              <p>日時：{popularLesson[2].date}</p>
              <p>開始予定時刻：{popularLesson[2].start_time}</p>
              <p>終了予定時刻：{popularLesson[2].location}</p>
              <p>場所：{popularLesson[2].location}</p>
            </figure>
          </div>
        </div>
      )}
    </>
  );
}
