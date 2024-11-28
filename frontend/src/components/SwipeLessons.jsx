import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";
import { ImageGallery } from "./ImageGallery";

export function SwipeLessons({
  profile,
  lesson,
  setFlick,
  setClickPopular,
  reserveLesson,
  handleSwipeType,
  popularLesson,
  startDate,
  endDate,
}) {
  const currentPath = process.env.REACT_APP_BASE_DIR || "../../";
  const [number, setNumber] = useState(0);
  const [popularFlag, setPopularFlag] = useState(false);
  const limit = 5;
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

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

  useEffect(() => {
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
        card1Ref.current.removeEventListener("animationend", handleAnimationEnd);
      }
      if (card2Ref.current) {
        card2Ref.current.removeEventListener("animationend", handleAnimationEnd);
      }
      if (card3Ref.current) {
        card3Ref.current.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [number, popularFlag]); // numberとpopularFlagが変わるたびにアニメーションを実行

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
    },
  });

  function clickPopularLesson(popularNumber) {
    setNumber(popularNumber);
    reserveLesson(popularNumber);
    setClickPopular(true);
    setFlick(false);
  }

  function returnFirstCard() {
    reserveLesson(0);
    setNumber(0);
  }

  function nextPopularCard() {
    setPopularFlag(true); // 人気のフラグを立てる
    startAnimation(); // アニメーションを開始
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
      ) : popularFlag === true ? (
        <div id="container">
          <div>
            <h1>3つ中から選んでね！</h1>
          </div>
          <div id="card" ref={card1Ref} onClick={() => clickPopularLesson(0)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その1</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[0].title}</h2>
              <p>{popularLesson[0].description}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card2Ref} onClick={() => clickPopularLesson(1)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その2</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[1].title}</h2>
              <p>{popularLesson[1].description}</p>
            </figure>
          </div>
          <br />
          <div id="card" ref={card3Ref} onClick={() => clickPopularLesson(2)}>
            <figure className="front">
              <h2>人気のあるレッスン</h2>
              <p>その3</p>
            </figure>
            <figure className="back">
              <h2>{popularLesson[2].title}</h2>
              <p>{popularLesson[2].description}</p>
            </figure>
          </div>
        </div>
      ) : (
        <center>
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
            >興味があるレッスンが無かったかな...？<br />
            人気でおすすめなレッスンを3つ選んだよ！<br />
            もし心残りがあれば、もう1回見てみる？</p>
            <p style={{
                fontSize: "14px",
                color: "#555",
                textAlign: "center",
                margin: "10px auto 0", // 上に余白を追加
                width: "100%", // 親幅に合わせる
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >人気のレッスンは選び直しができないから気をつけてね！</p>
          </div>
          <img
            src={"./images/dico.png"}
            alt="キャラクター"
            style={{
              width: "180px",
              height: "180px",
              marginBottom: "20px",
              position: "absolute",
              left: "27%",
              top: "30%",
            }}
          />
          <button
            onClick={returnFirstCard}
              style={{
                position: "absolute",
                bottom: "15%",
                left: "5%",
                width: "90%",
                padding: "10px",
                backgroundColor: "#6AAADE",
                color: "white",
                border: "none",
                borderradius: "5px",
                fontsize: "16px",
                cursor: "pointer",
              }}
          >選びなおす</button>
          <button
            onClick={nextPopularCard}
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
          >人気のレッスンへ</button>
        </center>
      )}
    </>
  );
}
